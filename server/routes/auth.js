const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registrazione utente
router.post('/register', authController.register);

// Accesso utente (genera il token JWT)
router.post('/login', authController.login);

module.exports = router;
