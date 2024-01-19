const Order = require('../models/Order');
const Product = require('../models/Product');

const orderController = {
  createOrder: async (req, res) => {
    try {
      const userId = req.user ? req.user : null;

      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const { products, shippingAddress, paymentMethod } = req.body;

      if (!products || products.length === 0) {
        return res.status(400).json({ error: 'Products list is required' });
      }

      const totalAmount = await calculateTotalAmount(products);

      const newOrder = new Order({
        customer: {
          userId: userId,
        },
        products: products.map(product => ({
          id: product.productId,
          quantity: product.quantity,
          price: product.price,
        })),
        totalAmount,
        shippingAddress,
        paymentMethod,
      });

      // Save the order to the database
      await newOrder.save();

      res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Error creating order' });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Error fetching orders' });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

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

      if (typeof newStatus !== 'string' || newStatus.trim() === '') {
        return res.status(400).json({ error: 'Invalid status provided' });
      }

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
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Error updating order status' });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const orderId = req.params.id;

      const deletedOrder = await Order.findByIdAndRemove(orderId);

      if (!deletedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ error: 'Error deleting order' });
    }
  },
};

const calculateTotalAmount = async (products) => {
  try {
    let totalAmount = 0;

    for (const product of products) {
      const productDetails = await Product.findOne({ id: product.productId });
      if (productDetails) {
        const productPrice = parseFloat(String(productDetails.price).replace('$', ''));
        totalAmount += productPrice * product.quantity;
      }
    }

    return totalAmount;
  } catch (error) {
    console.error('Error calculating total amount:', error);
    throw error;
  }
};

module.exports = orderController;
