const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const authController = {
  register: async (req, res) => {
    try {

      const { email, username, password } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already registered' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with username
      const newUser = new User({ email, username, password: hashedPassword });

      // Save to the database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ error: 'Error during user registration' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Search for the user in the database
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Verify the password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

      res.json({ token, username: user.username, userId: user._id, expiresIn: 3600 });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Error during login' });
    }
  },
};

module.exports = authController;
