const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User registration
router.post('/register', authController.register);

// User login (generates JWT token)
router.post('/login', authController.login);

module.exports = router;
