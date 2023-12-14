// index.js

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config({ path: '../.env' }); // Aggiungi questa riga

const app = express();
const port = process.env.PORT || 3000;

// Configurazione middleware
app.use(cors());
app.use(express.json());

// Middleware di logging
app.use((req, res, next) => {
  console.log(`Richiesta ricevuta: ${req.method} ${req.url}`);
  next();
});

// Connessione al database MongoDB
connectDB();

// Rotte per l'autenticazione
app.use('/auth', require('./routes/auth'));

// Rotte di esempio
app.get('/', (req, res) => {
  res.send('Hello, this is your server!');
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
