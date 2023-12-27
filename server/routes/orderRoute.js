// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Ottieni tutti gli ordini
router.get('/orders', orderController.getAllOrders);

// Ottieni un ordine per ID
router.get('/orders/:id', orderController.getOrderById);

// Crea un nuovo ordine
router.post('/orders', orderController.createOrder);

// Aggiorna lo stato di un ordine per ID
router.put('/orders/:id/status', orderController.updateOrderStatus);

// Elimina un ordine per ID
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;
