// controllers/productController.js

const Product = require('../models/Product');

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getProductById: async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createProduct: async (req, res) => {
    const { dish, description, price, imageUrl } = req.body;

    // Validazioni
    if (!dish || !description || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const newProduct = new Product({ dish, description, price, imageUrl });
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateProduct: async (req, res) => {
    const productId = req.params.id;
    const { dish, description, price, imageUrl } = req.body;

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { dish, description, price, imageUrl },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteProduct: async (req, res) => {
    const productId = req.params.id;

    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);

      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json(deletedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = productController;
