// controllers/orderController.js

const Order = require('../models/Order');

const orderController = {
  // Creazione di un nuovo ordine
  createOrder: async (req, res) => {
    try {
      const { customer, products, totalAmount } = req.body;

      // Crea una nuova istanza dell'ordine
      const newOrder = new Order({ customer, products, totalAmount });

      // Salva l'ordine nel database
      await newOrder.save();

      res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Recupero degli ordini di un determinato utente
  getOrdersByUser: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Trova gli ordini dell'utente nel database
      const userOrders = await Order.find({ customer: userId });

      res.status(200).json(userOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Altre operazioni legate agli ordini possono essere aggiunte qui
};

module.exports = orderController;
