const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 27017;

app.use(cors());
app.use(express.json());

// Connessione al database MongoDB
mongoose.connect('mongodb://localhost:27017/mydb', {
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Definisci i tuoi modelli e le tue route qui
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
