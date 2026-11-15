const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  borrowerName: { type: String, required: true },
  checkoutDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Active' } // 'Active' or 'Returned'
});

module.exports = mongoose.model('Checkout', checkoutSchema, 'Checkouts');