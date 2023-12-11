const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registrazione utente
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creazione di un nuovo utente
    const user = new User({ username, email, password: hashedPassword });

    // Salvataggio nel database
    await user.save();

    res.status(201).json({ message: 'Utente registrato con successo' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante la registrazione dell\'utente' });
  }
});

// Accesso utente
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ricerca dell'utente nel database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    // Verifica della password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Password non valida' });
    }

    // Generazione del token JWT
    const token = jwt.sign({ userId: user._id }, 'segreto', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante l\'accesso' });
  }
});

module.exports = router;
