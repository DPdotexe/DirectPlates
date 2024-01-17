const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    userId: { type: String, required: true },
  },
  products: [
    {
      id: { type: String, required: true }, 
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, default: 0 },
  shippingAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
