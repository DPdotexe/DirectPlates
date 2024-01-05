const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const morgan = require('morgan');
const dotenv = require('dotenv');
const jwtMiddleware = require('./middlewares/jwtMiddleware');
const cookieParser = require('cookie-parser'); // Nuova importazione

// Carica le variabili d'ambiente da un file .env
dotenv.config({ path: '../.env' });


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Aggiunta per gestire i cookies
app.use(morgan('dev'));

// Collega al database
connectDB();

// Rotte pubbliche
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/UserRoute'));
app.use('/products', require('./routes/productRoute'));

// Middleware JWT e gestione token nei cookies solo per le rotte protette
app.use(['/orders', '/profile'], jwtMiddleware);

// Rotte protette
app.use('/orders', require('./routes/orderRoute'));
app.use('/profile', require('./routes/profileRoute'));

// Rotte di gestione degli errori (se necessario)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Rotta principale
app.get('/', (req, res) => {
  res.send('Hello, this is your server!');
});

// Aggiungi un middleware per loggare le richieste
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
