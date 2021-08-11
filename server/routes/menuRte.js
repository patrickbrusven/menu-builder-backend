const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menuCtrl.js');
const verify = require('../verifyToken.js');

router.route('/')
  .get(MenuController.index);

router.route('/:menuId')
  .get(verify, MenuController.getMenu)
  .patch(MenuController.updateMenu)
  .delete(MenuController.removeMenu);

router.route('/:menuId/menuitems')
  .get(MenuController.getMenuItems)
  .post(MenuController.newMenuItem);

router.route('/:menuId/:menuItemId')
  .get(MenuController.getMenuItem)
  .patch(MenuController.updateMenuItem)
  .delete(MenuController.removeMenuItem);

module.exports = router;
