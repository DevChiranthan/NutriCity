const express = require('express');
const router = express.Router();
const Offer = require('../models/Offer');

// Get all active offers
router.get('/', async (req, res) => {
  try {
    const offers = await Offer.find({ isActive: true })
      .populate('vendor', 'name email')
      .sort('-createdAt');
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get vendor's offers
router.get('/vendor/:vendorId', async (req, res) => {
  try {
    const offers = await Offer.find({ vendor: req.params.vendorId })
      .sort('-createdAt');
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new offer
router.post('/', async (req, res) => {
  const offer = new Offer({
    vendor: req.body.vendorId,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    validUntil: req.body.validUntil,
    imageUrl: req.body.imageUrl,
  });

  try {
    const newOffer = await offer.save();
    res.status(201).json(newOffer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update offer
router.patch('/:id', async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        offer[key] = req.body[key];
      }
    });

    const updatedOffer = await offer.save();
    res.json(updatedOffer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete offer
router.delete('/:id', async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    await offer.remove();
    res.json({ message: 'Offer deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 