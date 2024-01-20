// Middleware jwtMiddleware.js
const jwt = require('jsonwebtoken');

function jwtMiddleware(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  // Log the token received from the request header
  console.log('Token from request header:', token);

  if (!token) {
    // Token not provided, access denied
    console.error('Access denied. Token not provided.');
    return res.status(401).json({ message: 'Access denied. Token not provided.' });
  }

  try {
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);

    // Extract necessary fields from the token
    req.user = decoded.userId;

    // Log the decoded user information
    console.log('Decoded user:', req.user);

    // Set the Access-Control-Allow-Credentials header to true
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', 'https://directplates.netlify.app');

    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    if (error.name === 'TokenExpiredError') {
      // Token expired
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    }
    // Invalid token
    return res.status(401).json({ message: 'Invalid token.' });
  }
}

module.exports = jwtMiddleware;
