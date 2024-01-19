// index.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const morgan = require('morgan');
const dotenv = require('dotenv');
const jwtMiddleware = require('./middlewares/jwtMiddleware');

// Load environment variables from a .env file
dotenv.config({ path: '../.env' });

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Specify your frontend domain
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
app.use(morgan('dev'));

// Connect to the database
connectDB();

// Public routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/UserRoute'));
app.use('/products', require('./routes/productRoute'));

// JWT middleware and token handling in localStorage only for protected routes
app.use(['/orders', '/profile'], jwtMiddleware);

// Protected routes
app.use('/orders', require('./routes/orderRoute'));
app.use('/profile', require('./routes/UserRoute'));

// Cart management routes
app.use('/cart', require('./routes/cartRoute'));

// Main route
app.get('/', (req, res) => {
  res.send('Hello, this is your server!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Add middleware to log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
