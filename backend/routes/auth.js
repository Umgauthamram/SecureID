const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

//Register User
router.post('/register', async (req, res) => {
  try {
    const { username, email, phone, password, passcode, passphrase, metamaskAddress } = req.body;

    if (!username || !email || !phone || !password || !passcode || !passphrase || !metamaskAddress) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number format. Must be 10 digits.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

   
    const newUser = new User({
      username,
      email,
      phone,
      password,
      passcode,
      passphrase, 
      metamaskAddress
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

//Login User
router.post('/login', async (req, res) => {
  try {
    const { emailOrPhone, password, passcode, passphrase, metamaskAddress } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }, { metamaskAddress }]
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

   
    const token = jwt.sign(
      { userId: user._id, email: user.email, metamaskAddress: user.metamaskAddress },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ message: 'Login successful.', token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
