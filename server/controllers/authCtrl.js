const User = require('../models/userModel.js');

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
  getUserByToken: asyncHandler ( async(req, res, next) => {
    const { tokenId } = req.params;
    const user = await User.findOne({token: tokenId});
    res.status(200).json(user);
  }),

  registerUser: asyncHandler( async(req, res, next) => {
    // check if user email already exists
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    const newUser = new User(req.body);
    newUser.token = 'thisIsAToken';
    const user = await newUser.save()
    res.status(201).header('auth-token', user.token).json(user);
  }),

  loginUser: asyncHandler( async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send("Email dosen't exist");

    const clientPassword = req.body.password;
    if (user.password != clientPassword) {
      return res.status(400).send('Invalid password')
    }
    user.token = 'thisIsAToken';
    await user.save();
    res.status(200).header('auth-token', user.token).json(user);
  }),
}
