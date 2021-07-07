const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userCtrl.js');

router.route('/')
  .get(UserController.index)
  .post(UserController.newUser);

router.route('/:userId')
  .get(UserController.getUser)
  .put(UserController.replaceUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

router.route('/:userId/menus')
  .get(UserController.getUsersMenus)
  .post(UserController.newUsersMenu);

module.exports = router;
