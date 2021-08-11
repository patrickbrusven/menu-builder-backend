const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menuCtrl.js');
const verify = require('../verifyToken.js');

router.route('/')
  .get(MenuController.index);

router.route('/:menuId')
  .get(MenuController.getMenu)
  .patch(verify, MenuController.updateMenu)
  .delete(verify, MenuController.removeMenu)

router.route('/:menuId/menuitems')
  .get(MenuController.getMenuItems)
  .post(verify, MenuController.newMenuItem)

router.route('/:menuId/:menuItemId')
  .get(MenuController.getMenuItem)
  .patch(verify, MenuController.updateMenuItem)
  .delete(verify, MenuController.removeMenuItem)

module.exports = router;
