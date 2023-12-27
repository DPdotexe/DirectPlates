const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Campi relativi all'ordine
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Riferimento al modello User
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Riferimento al modello Product, se necessario
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  // Altri campi dell'ordine come data di creazione, stato, ecc.
}, {
  timestamps: true, // Utilizza direttamente l'oggetto timestamps
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
