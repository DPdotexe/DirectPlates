// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Endpoint to get all products
router.get('/products', productController.getAllProducts);

// Endpoint to add a new product
router.post('/products', productController.createProduct);

module.exports = router;
