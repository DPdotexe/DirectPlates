const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Connessione al database MongoDB
mongoose.connect('mongodb://localhost/my-full-stack-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definisci i tuoi modelli e le tue route qui

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
