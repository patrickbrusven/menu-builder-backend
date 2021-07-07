const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authCtrl.js');

router.route('/:tokenId')
  .get(AuthController.getUserByToken);
router.route('/register')
  .post(AuthController.registerUser);
router.route('/login')
  .post(AuthController.loginUser);

module.exports = router;
