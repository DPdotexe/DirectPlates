// orderRoute.js
const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware'); // Assicurati di avere questa importazione corretta
const orderController = require('../controllers/orderController');

// Ottieni tutti gli ordini (richiede autenticazione)
router.get('/orders', jwtMiddleware, orderController.getAllOrders);

// ... Altre route con middleware JWT

module.exports = router;
