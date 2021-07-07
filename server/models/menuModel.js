const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  restaurant: String,
  date: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'collectionUser'
  },
  menuItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'collectionMenuItem'
  }]
});

const Menu = mongoose.model('collectionMenu', menuSchema);

module.exports = Menu;
