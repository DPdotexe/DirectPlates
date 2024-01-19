const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
  // Register a new user
  register: async (req, res) => {
    try {
      const { email, username, password } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email or username' });
      }

      // Create a new user instance
      const newUser = new User({ email, username, password });

      // Hash the password before saving it to the database
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // User login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Check the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Generate the JWT token
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '8h' });

      res.status(200).json({ token, userId: user._id, expiresIn: 3600 }); // expiresIn in seconds
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Update user profile
  updateProfile: async (req, res) => {
    try {
      const { userId, address, phoneNumber } = req.body;

      // Check if the user exists
      const user = await User.findByIdAndUpdate(
        userId,
        { address, phoneNumber },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json({
        success: true,
        message: 'Profile updated successfully',
        address: user.address,
        phoneNumber: user.phoneNumber,
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get user profile
  getProfile: async (req, res) => {
    try {
      const userId = req.user.userId; // Get user ID from the token

      // Check if the user exists
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json({
        success: true,
        message: 'Profile retrieved successfully',
        profile: {
          username: user.username,
          address: user.address,
          phoneNumber: user.phoneNumber,
        },
      });
    } catch (error) {
      console.error('Error retrieving profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = userController;
