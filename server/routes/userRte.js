const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userCtrl.js');
const verify = require('../verifyToken.js');

router.route('/')
  .get(UserController.index)
  .post(UserController.newUser)

router.route('/:userId')
  .get(UserController.getUser)
  .put(verify, UserController.replaceUser)
  .patch(verify, UserController.updateUser)
  .delete(verify, UserController.deleteUser)

router.route('/:userId/menus')
  .get(UserController.getUsersMenus)
  .post(verify, UserController.newUsersMenu)

module.exports = router;
