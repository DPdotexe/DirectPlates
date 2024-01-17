const Cart = require('../models/Cart');

const cartController = {
  addToCart: async (req, res) => {
    try {
      // Log the incoming request details
      console.log('Request received at /cart/add');
      console.log('Data received:', req.body);

      const { userId, product, quantity } = req.body;

      // Ensure that the 'product' object and its 'id' property are defined
      if (!product || !product.id) {
        console.log('Invalid product:', product);
        return res.status(400).json({ success: false, message: 'The product is not valid' });
      }

      // Check if the user exists (you may need to add your specific logic)
      if (!userId) {
        console.log('Invalid userId:', userId);
        return res.status(400).json({ success: false, message: 'Invalid userId' });
      }

      // Find the user's cart
      let cart = await Cart.findOne({ userId });

      // If the cart does not exist, create a new one
      if (!cart) {
        cart = new Cart({ userId, products: [] });
      }

      // Search for the product in the cart
      const existingProductIndex = cart.products.findIndex(
        (p) => p.productId === product.id
      );

      // Update the quantity if the product is already in the cart
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += quantity || 1;
      } else {
        // Add a new product to the cart
        cart.products.push({ productId: product.id, quantity: quantity || 1 });
      }

      // Save the updated cart to the database
      const updatedCart = await cart.save();

      // Respond with details of the updated cart
      return res.status(200).json({
        success: true,
        message: 'Product successfully added to the cart!',
        cartId: updatedCart._id,
        product: {
          id: product.id,
          quantity: quantity || 1,
        },
      });
    } catch (error) {
      // Handle errors during the cart addition process
      console.error('Error while adding to the cart:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
};

module.exports = cartController;
