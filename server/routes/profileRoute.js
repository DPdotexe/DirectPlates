// userProfileRoute.js
const express = require('express');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

const router = express.Router();

router.put('/profile', jwtMiddleware, (req, res) => {
  const receivedToken = req.headers.authorization;
  console.log('Token received in PUT /users/profile:', receivedToken);

  try {
    const decoded = jwt.verify(receivedToken.split(' ')[1], process.env.SECRET_KEY);
    console.log('Token successfully verified. Decoded:', decoded);

    // Resto della logica per la gestione del profilo...
  } catch (error) {
    console.error('Error during JWT verification:', error);
    res.status(401).json({ message: 'Invalid token. User not authenticated.' });
  }
});

module.exports = router;
