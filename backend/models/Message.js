const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  messageType: {
    type: String,
    enum: ['text', 'image'],
    default: 'text',
  },
  imageUrl: {
    type: String,
  },
}, {
  timestamps: true,
});

// Index for efficient querying
messageSchema.index({ room: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema); 