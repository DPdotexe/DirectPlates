// orderRoute.js
const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const orderController = require('../controllers/orderController');

// Handle preflight OPTIONS request
router.options('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://directplates.netlify.app/'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.status(200).end();
});

// Create a new order (requires authentication)
router.post('/', jwtMiddleware, orderController.createOrder);

module.exports = router;
