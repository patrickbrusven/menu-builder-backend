const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    default: 'admin'
  },
  token: {
    type: String,
    default: '',
  },
  menus: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'collectionMenu'
  }]
});

const User = mongoose.model('collectionUser', userSchema);

module.exports = User;
