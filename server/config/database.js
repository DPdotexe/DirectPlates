const mongoose = require('mongoose');
require('dotenv').config();

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Retrieve MongoDB URI from environment variables
    const uri = process.env.MONGO_URI;

    // Check if MongoDB URI is defined
    if (!uri) {
      console.error('MONGO_URI is not defined in .env');
      process.exit(1); // Exit process with failure
    }

    // Connect to MongoDB using Mongoose
    await mongoose.connect(uri, {
      // Additional connection options can be added here
    });

    // Log success message if connected
    console.log('MongoDB connected');
  } catch (error) {
    // Log error message if connection fails
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Export the connectDB function
module.exports = connectDB;
