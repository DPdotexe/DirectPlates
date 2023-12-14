// routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registrazione utente
router.post('/register', authController.register);

// Accesso utente
router.post('/login', authController.login);

module.exports = router;
