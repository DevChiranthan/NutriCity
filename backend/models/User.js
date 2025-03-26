const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['student', 'vendor'],
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  calorieData: [{
    type: mongoose.Schema.Types.Mixed
  }],
  groceryLists: [{
    type: mongoose.Schema.Types.Mixed
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema); 