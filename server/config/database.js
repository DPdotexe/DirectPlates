const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    console.log('MONGO_URI from process.env:', uri); // Aggiunto per debugging

    if (!uri) {
      console.error('MONGO_URI is not defined in .env');
      process.exit(1); // Exit process with failure
    }

    await mongoose.connect(uri, {
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
