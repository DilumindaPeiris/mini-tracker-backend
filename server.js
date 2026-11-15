const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Models
const Item = require('./models/Item');
const Checkout = require('./models/Checkout');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB: EquipmentTracker'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// ROUTE 1: Get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ROUTE 2: Checkout an item
app.post('/api/checkout', async (req, res) => {
  const { itemId, borrowerName } = req.body;
  try {
    // 1. Find the item
    const item = await Item.findById(itemId);
    if (!item || item.availableQuantity <= 0) {
      return res.status(400).json({ message: 'Item unavailable' });
    }

    // 2. Decrease available quantity
    item.availableQuantity -= 1;
    await item.save();

    // 3. Create checkout record
    const newCheckout = new Checkout({ itemId, borrowerName });
    await newCheckout.save();

    res.status(201).json(newCheckout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ROUTE 3: Return an item
app.post('/api/return', async (req, res) => {
  const { itemId } = req.body;
  try {
    const item = await Item.findById(itemId);
    
    // Prevent returning more items than the total inventory allows
    if (!item || item.availableQuantity >= item.totalQuantity) {
      return res.status(400).json({ message: 'All items are already returned' });
    }

    // Increase available quantity
    item.availableQuantity += 1;
    await item.save();

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
