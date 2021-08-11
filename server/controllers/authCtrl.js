const User = require('../models/userModel.js');
const { registerValidation, loginValidation } = require('../validation.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

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

    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword
    });

    const token = await jwt.sign({_id: newUser._id}, process.env.TOKEN_SECRET)
    newUser.token = token;
    const user = await newUser.save()
    res.status(201).header('auth-token', user.token).json(user);
  }),

  loginUser: asyncHandler( async(req, res, next) => {
    
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send("Email dosen't exist");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).send('Invalid password')
    }

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    user.token = token;
    await user.save();
    res.status(200).header('auth-token', user.token).json(user);
  }),
}
