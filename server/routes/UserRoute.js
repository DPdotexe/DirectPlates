// UserRoute.js
const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware'); // Assicurati di avere questa importazione corretta
const userController = require('../controllers/userController');

// Registra un nuovo utente
router.post('/register', userController.register);

// Login dell'utente
router.post('/login', userController.login);

// Assicurati che la route /profile utilizzi jwtMiddleware e successivamente il controller
router.put('/profile', jwtMiddleware, userController.updateProfile);

module.exports = router;
