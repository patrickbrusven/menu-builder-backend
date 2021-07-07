const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  categorie: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  mealPrice: {
    type: Number,
    default: ''
  },
  pairing: {
    type: String,
    default: ''
  },
  glutenFree: {
    type: Boolean,
    default: false
  },
  vegetarian: {
    type: Boolean,
    default: false
  },
  vegan: {
    type: Boolean,
    default: false
  },
  special: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'collectionMenu'
  }
});

const MenuItem = mongoose.model('collectionMenuItem', menuItemSchema);

module.exports = MenuItem;
