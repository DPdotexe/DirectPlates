const Order = require('../models/Order');
const Product = require('../models/Product');

const orderController = {
  createOrder: async (req, res) => {
    try {
      console.log('Received order creation request:', req.body);

      // Verifica se l'utente è autenticato
      const userId = req.user ? req.user.sub : null;

      if (!userId) {
        console.log('User not authenticated');
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const { products } = req.body;

      // Verifica che la lista dei prodotti non sia vuota
      if (!products || products.length === 0) {
        console.log('Products list is required');
        return res.status(400).json({ error: 'Products list is required' });
      }

      // Calcola il totale dell'ordine in base ai prodotti e alle loro quantità
      const totalAmount = await calculateTotalAmount(products);

      // Crea un nuovo ordine con l'userId
      const newOrder = new Order({
        customer: userId,
        products,
        totalAmount,
      });

      console.log('Order details:', newOrder);

      // Salva l'ordine nel database
      await newOrder.save();

      console.log('Order saved in the database');

      res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Error creating order' });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      // Recupera tutti gli ordini dal database
      const orders = await Order.find();

      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Error fetching orders' });
    }
  },

  getOrderById: async (req, res) => {
    try {
      // Recupera l'ordine per ID dal database
      const order = await Order.findById(req.params.id);

      res.status(200).json(order);
    } catch (error) {
      console.error('Error fetching order by ID:', error);
      res.status(500).json({ error: 'Error fetching order by ID' });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const orderId = req.params.id;
      const newStatus = req.body.status;

      // Verifica che lo status sia una stringa non vuota
      if (typeof newStatus !== 'string' || newStatus.trim() === '') {
        console.log('Invalid status provided');
        return res.status(400).json({ error: 'Invalid status provided' });
      }

      // Aggiorna lo status dell'ordine nel database
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status: newStatus },
        { new: true }
      );

      if (!updatedOrder) {
        console.log('Order not found');
        return res.status(404).json({ error: 'Order not found' });
      }

      console.log('Order status updated successfully:', updatedOrder);

      res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Error updating order status' });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const orderId = req.params.id;

      // Elimina l'ordine dal database
      const deletedOrder = await Order.findByIdAndRemove(orderId);

      if (!deletedOrder) {
        console.log('Order not found');
        return res.status(404).json({ error: 'Order not found' });
      }

      console.log('Order deleted successfully:', deletedOrder);

      res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ error: 'Error deleting order' });
    }
  },
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
