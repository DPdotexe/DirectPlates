const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  dish: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
