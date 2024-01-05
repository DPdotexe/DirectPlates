// middleware/jwtMiddleware.js
const jwt = require('jsonwebtoken');

function jwtMiddleware(req, res, next) {
  const token = req.cookies.DPCookie; // Assicurati che il nome del cookie sia corretto

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token not provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    }
    return res.status(401).json({ message: 'Invalid token.' });
  }
}

module.exports = jwtMiddleware;
