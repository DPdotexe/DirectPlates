// controllers/orderController.js

const Order = require('../models/Order');
const Product = require('../models/Product');

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { customer, products } = req.body;

      // Calcola il totale dell'ordine in base ai prodotti e alle loro quantità
      const totalAmount = await calculateTotalAmount(products);

      // Crea un nuovo ordine
      const newOrder = new Order({
        customer,
        products,
        totalAmount,
      });

      // Salva l'ordine nel database
      await newOrder.save();

      res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating order' });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      // Recupera tutti gli ordini dal database
      const orders = await Order.find();

      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching orders' });
    }
  },

  getOrderById: async (req, res) => {
    try {
      // Recupera l'ordine per ID dal database
      const order = await Order.findById(req.params.id);

      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching order by ID' });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const orderId = req.params.id;
      const newStatus = req.body.status;

      // Verifica che lo status sia una stringa non vuota
      if (typeof newStatus !== 'string' || newStatus.trim() === '') {
        return res.status(400).json({ error: 'Invalid status provided' });
      }

      // Aggiorna lo status dell'ordine nel database
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status: newStatus },
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating order status' });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const orderId = req.params.id;

      // Elimina l'ordine dal database
      const deletedOrder = await Order.findByIdAndRemove(orderId);

      if (!deletedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting order' });
    }
  },

  // Altre operazioni legate agli ordini possono essere aggiunte qui
};

// Funzione di supporto per calcolare il totale dell'ordine
const calculateTotalAmount = async (products) => {
  let totalAmount = 0;

  // Itera sui prodotti nell'ordine e calcola il totale
  for (const product of products) {
    const productDetails = await Product.findById(product.product);
    totalAmount += productDetails.price * product.quantity;
  }

  return totalAmount;
};

module.exports = orderController;
