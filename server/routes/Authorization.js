const router = require('express').Router();
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation.js');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

router.get('/:token', async (req, res) => {
  try {
    const user = await User.findOne({token: req.params.token});
    // console.log(user);
    res.send(user);
  } catch(err) {
    res.status(400).send(err);
  }
});

// register route
router.post('/register', async (req, res) => {
  //validate before saving user
  const { error } = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  // check if user email already exists
  const emailExist = await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).send('Email already exists');

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });

  try {
    const savedUser = await user.save();
    const token = await jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    // res.header('auth-token', token).send(token);
    res.send(savedUser);
  } catch(err) {
    res.status(400).send(err);
  }
});


// login route
router.post('/login', async (req, res) => {
  //validate before saving user
  const { error } = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  // check if user email already exists
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send("Email dosen't exist");


  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('Invalid password')

  // create and asign an jsonwebtoken
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  user.token = token

  await user.save();


  try {

    res.header('auth-token', user.token).send(user);
  } catch(err) {
    res.status(400).send(err);
  }
});

module.exports = router;
