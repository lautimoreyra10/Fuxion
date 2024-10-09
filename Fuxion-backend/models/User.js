const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  document: {
    type: String,
  },
  address: {
    type: String,
  },
  card: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
