const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menuCtrl.js');

router.route('/')
  .get(MenuController.index);

router.route('/:menuId')
  .get(MenuController.getMenu)
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
