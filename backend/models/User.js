const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    match: /^[0-9]{10}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  passcode: {
    type: Number ,
    required: true,
    minlength: 4,
    maxlength: 6
  },
  passphrase: {
    type: [String], 
    required: true
  },
  metamaskAddress: {
    type: String,
    required: true,
    unique: true
  }
});



module.exports = mongoose.model('User', userSchema);
