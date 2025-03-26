const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user's grocery lists
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.groceryLists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new grocery list
router.post('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newList = {
      name: req.body.name,
      items: req.body.items,
    };

    user.groceryLists.push(newList);
    await user.save();

    res.status(201).json(newList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update grocery list
router.patch('/:userId/:listId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const list = user.groceryLists.id(req.params.listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    if (req.body.name) list.name = req.body.name;
    if (req.body.items) list.items = req.body.items;

    await user.save();
    res.json(list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete grocery list
router.delete('/:userId/:listId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.groceryLists.id(req.params.listId).remove();
    await user.save();

    res.json({ message: 'Grocery list deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get default Ugadi grocery list template
router.get('/template/ugadi', (req, res) => {
  const ugadiTemplate = {
    name: 'Ugadi Festival Grocery List',
    items: [
      { name: 'Raw Mango', quantity: '500g', category: 'Fruits' },
      { name: 'Neem Flowers', quantity: '100g', category: 'Herbs' },
      { name: 'Jaggery', quantity: '250g', category: 'Sweeteners' },
      { name: 'Tamarind', quantity: '200g', category: 'Spices' },
      { name: 'Coconut', quantity: '2 pcs', category: 'Fruits' },
      { name: 'Betel Leaves', quantity: '20 pcs', category: 'Herbs' },
      { name: 'Rice', quantity: '1 kg', category: 'Grains' },
      { name: 'Yellow Split Peas', quantity: '250g', category: 'Legumes' },
      { name: 'Cardamom', quantity: '50g', category: 'Spices' },
      { name: 'Ghee', quantity: '200g', category: 'Dairy' },
    ],
  };
  
  res.json(ugadiTemplate);
});

module.exports = router; 