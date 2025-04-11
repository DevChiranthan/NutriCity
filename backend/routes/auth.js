const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

// Initialize Google OAuth client with the correct client ID
const client = new OAuth2Client('246701491552-mjd55ngujja9ivhc9j5fmu4js2tnkkg8.apps.googleusercontent.com');

// Health check route to keep backend awake
router.get('/ping', (req, res) => {
  res.status(200).send('Backend is alive!');
});

// Google OAuth route
router.post('/google', async (req, res) => {
  try {
    const { token, role, forceRoleSwitch } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }

    // Verify the Google token with the correct audience
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '246701491552-mjd55ngujja9ivhc9j5fmu4js2tnkkg8.apps.googleusercontent.com'
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture: profilePicture } = payload;

    // Find or create user
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user with the exact format
      user = await User.create({
        googleId,
        email,
        name,
        role,
        profilePicture,
        calorieData: [],
        groceryLists: []
      });
    } else if (user.role !== role) {
      if (forceRoleSwitch) {
        // Update user's role if forceRoleSwitch is true
        user.role = role;
        await user.save();
      } else {
        return res.status(400).json({ 
          message: 'This email is already registered with a different role',
          currentRole: user.role
        });
      }
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { userId: user._id, role: user.role },
      'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.profilePicture,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: 'Authentication failed', error: error.message });
  }
});

// Token verification route
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, 'your-secret-key'); // Using the same fixed secret key
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
});

module.exports = router;
