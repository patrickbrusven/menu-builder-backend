const User = require('../models/userModel.js');
const Menu = require('../models/menuModel.js');
const MenuItem = require('../models/menuItemModel.js');

function asyncHandler(cb){
  return async (req, res, next)=>{
    try {
      await cb(req, res, next);
    } catch(err){
      next(err);
    }
  };
}

module.exports = {
  index: asyncHandler( async (req, res, next) => {
    const menus = await Menu.find({});
    res.status(200).json(menus);
  }),

  getMenu: asyncHandler( async (req, res, next) => {
    const { menuId } = req.params;
    const menu = await Menu.findById(menuId);
    res.status(200).json(menu);
  }),

  updateMenu: asyncHandler( async (req, res, next) => {
    const { menuId } = req.params;
    const newMenu = req.body;
    const menu = await Menu.findByIdAndUpdate(menuId, newMenu);
    res.status(201).json(menu);
  }),

  removeMenu: asyncHandler( async (req, res, next) => {
    const { menuId } = req.params;
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(400).json( {error: 'Menu does not exist'} )
    }
    if (menu.menuItems) {
      await MenuItem.deleteMany({ owner: menuId });
    }
    const userId = menu.owner;
    const user = await User.findById(userId);
    user.menus.pull(menu);
    await user.save();
    const deleted = await Menu.findByIdAndDelete(menuId)

    res.status(200).json(deleted);
  }),

  getMenuItems: asyncHandler( async (req, res, next) => {
    const { menuId } = req.params;
    const menu = await Menu.findById(menuId).populate('menuItems');
    res.status(200).json(menu.menuItems);
  }),

  newMenuItem: asyncHandler(async (req, res, next) => {
    const { menuId } = req.params;
    const newMenuItem = new MenuItem(req.body);
    const menu = await Menu.findById(menuId);
    newMenuItem.owner = menu._id;
    await newMenuItem.save();
    menu.menuItems.push(newMenuItem._id);
    await menu.save()
    res.status(201).json(newMenuItem);
  }),

  getMenuItem: asyncHandler(async (req, res, next) => {
    const { menuItemId } = req.params;
    const menuItem = await MenuItem.findById(menuItemId);
    res.status(200).json(menuItem);
  }),

  updateMenuItem: asyncHandler(async (req, res, next) => {
    const { menuItemId } = req.params;
    const newMenuItem = req.body;
    const menuItem = await MenuItem.findByIdAndUpdate(menuItemId, newMenuItem);
    res.status(201).json(menuItem);
  }),

  removeMenuItem: asyncHandler( async (req, res, next) => {
    const { menuItemId } = req.params;
    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) {
      return res.status(400).json( {error: 'Menu Item does not exist'} )
    }
    const menuId = menuItem.owner;
    const menu = await Menu.findById(menuId);
    menu.menuItems.pull(menuItem);
    await menu.save();
    const deleted = await MenuItem.findByIdAndDelete(menuItemId)
    res.status(200).json(deleted);
  }),
};
