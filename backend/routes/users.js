const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-googleId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.patch('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const allowedUpdates = ['name', 'profilePicture'];
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        user[key] = req.body[key];
      }
    });

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add calorie data
router.post('/:userId/calories', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const calorieEntry = {
      date: new Date(req.body.date),
      intake: req.body.intake,
      burned: req.body.burned,
    };

    user.calorieData.push(calorieEntry);
    await user.save();

    res.status(201).json(calorieEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get calorie data for a date range
router.get('/:userId/calories', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { startDate, endDate } = req.query;
    const calorieData = user.calorieData.filter(entry => {
      const entryDate = new Date(entry.date);
      return (!startDate || entryDate >= new Date(startDate)) &&
             (!endDate || entryDate <= new Date(endDate));
    });

    res.json(calorieData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all vendors
router.get('/role/vendors', async (req, res) => {
  try {
    const vendors = await User.find({ role: 'vendor' })
      .select('name email profilePicture');
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 