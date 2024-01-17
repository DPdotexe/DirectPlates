// Middleware jwtMiddleware.js
const jwt = require('jsonwebtoken');

function jwtMiddleware(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  console.log('Token from request header:', token);

  if (!token) {
    console.error('Access denied. Token not provided.');
    return res.status(401).json({ message: 'Access denied. Token not provided.' });
  }

  try {
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);

    // Estrai i campi necessari dal token
    req.user = decoded.userId;

    console.log('Decoded user:', req.user);

    // Imposta l'header Access-Control-Allow-Credentials su true
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');

    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    }
    return res.status(401).json({ message: 'Invalid token.' });
  }
}

module.exports = jwtMiddleware;
