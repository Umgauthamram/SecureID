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
    type: String,
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
    type: String,
    required: true,
    minlength: 6,
    maxlength: 6
  },
  passphrase: {
    type: String, 
    required: true
  },
  metamaskAddress: {
    type: String,
    required: true,
    unique: true
  }
});


userSchema.pre('save', async function (next) {
  if (!this.isModified('password') && !this.isModified('passcode') && !this.isModified('passphrase')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, salt);
  }

  if (this.isModified('passcode')) {
    this.passcode = await bcrypt.hash(this.passcode, salt);
  }

  if (this.isModified('passphrase')) {
    this.passphrase = await bcrypt.hash(this.passphrase, salt);
  }

  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.comparePasscode = async function (enteredPasscode) {
  return await bcrypt.compare(enteredPasscode, this.passcode);
};

userSchema.methods.comparePassphrase = async function (enteredPassphrase) {
  return await bcrypt.compare(enteredPassphrase, this.passphrase);
};

module.exports = mongoose.model('User', userSchema);
