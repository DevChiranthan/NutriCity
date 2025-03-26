const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Get messages for a room
router.get('/:room', auth, async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room })
      .populate('sender', 'name email profilePicture')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Send a new message
router.post('/', auth, upload.array('attachments', 5), async (req, res) => {
  try {
    const { content, room } = req.body;
    const attachments = req.files ? req.files.map(file => file.path) : [];

    const message = await Message.create({
      content,
      room,
      sender: req.user.id,
      attachments
    });

    const populatedMessage = await message.populate('sender', 'name email profilePicture');
    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
});

module.exports = router; 