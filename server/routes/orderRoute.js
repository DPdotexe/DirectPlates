// orderRoute.js
const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const orderController = require('../controllers/orderController');

// Gestione richiesta di preflight OPTIONS
router.options('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.status(200).end();
});

// Crea un nuovo ordine (richiede autenticazione)
router.post('/', jwtMiddleware, orderController.createOrder);

module.exports = router;
