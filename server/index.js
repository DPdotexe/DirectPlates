// index.js

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const morgan = require('morgan');
require('dotenv').config({ path: '../.env' });

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Collega al database
connectDB();

// Collega le route dell'applicazione
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/UserRoute')); 
app.use('/products', require('./routes/productRoute'));
app.use('/orders', require('./routes/orderRoute'));
app.use('/cart', require('./routes/cartRoute'));

app.get('/', (req, res) => {
  res.send('Hello, this is your server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
