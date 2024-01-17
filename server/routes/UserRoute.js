// UserRoute.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user
router.post('/register', userController.register);

// Login the user
router.post('/login', userController.login);

// Update user profile
router.put('/updateProfile', userController.updateProfile);

// Get user profile
router.get('/getProfile', userController.getProfile);

module.exports = router;
