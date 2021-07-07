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
    const users = await User.find({});
    res.status(200).json(users);
  }),

  newUser: asyncHandler( async (req, res, next) => {
    const newUser = new User(req.body);
    const user = await newUser.save()
    res.status(201).json(user);
  }),

  getUser: asyncHandler( async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  }),

  // should be updated to strict change all fields
  replaceUser: asyncHandler( async (req, res, next) => {
    const { userId } = req.params;
    const newUser = req.body;
    const user = await User.findByIdAndUpdate(userId, newUser);
    res.status(201).json(user);
  }),

  updateUser: asyncHandler( async (req, res, next) => {
    const { userId } = req.params;
    const newUser = req.body;
    const user = await User.findByIdAndUpdate(userId, newUser);
    res.status(201).json(user);
  }),

  deleteUser: asyncHandler( async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user.menus) {
      for( i = 0; i < user.menus.length; i++) {
        const menuId = user.menus[i];
        await MenuItem.deleteMany({ owner: menuId });
        await Menu.findByIdAndDelete(menuId);
      }
    }
    const deleted = await User.findByIdAndDelete(userId);
    res.status(200).json(deleted);
  }),

  getUsersMenus: asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('menus');
    res.status(200).json(user.menus);
  }),

  newUsersMenu: asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId);

    const newMenu = new Menu(req.body);

    newMenu.owner = user._id;
    await newMenu.save();
    user.menus.push(newMenu._id);
    await user.save()
    res.status(201).json(newMenu);
  }),
};
