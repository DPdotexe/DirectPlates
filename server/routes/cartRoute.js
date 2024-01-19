const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', (req, res) => {
  cartController.addToCart(req, res);
});

module.exports = router;
