const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Fruits', 'Vegetables', 'Grains', 'Spices', 'Bundles', 'Other'],
    default: 'Other',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  validUntil: {
    type: Date,
  },
  imageUrl: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Offer', offerSchema); 