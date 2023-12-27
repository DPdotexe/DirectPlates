// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Endpoint per ottenere tutti i prodotti
router.get('/products', productController.getAllProducts);

// Endpoint per aggiungere un nuovo prodotto
router.post('/products', productController.createProduct);

module.exports = router;
