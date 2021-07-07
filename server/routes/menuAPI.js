const express = require('express');
const router = express.Router();
// const verify = require('../verifyToken.js');

let MenuItemModel = require('../models/menuItem.js');

function asyncHandler(cb){
  return async (req, res, next)=>{
    try {
      await cb(req,res, next);
    } catch(err){
      next(err);
    }
  };
}

router.get('/', asyncHandler( async (req, res) => {
  const menu = await MenuItemModel.find()
  res.json(menu);
}));

router.get('/:id', asyncHandler( async (req, res) => {
  const menuItem = await MenuItemModel.findById(req.params.id)
  res.json(menuItem);
}));

router.post('/', asyncHandler( async (req, res) => {
  const menuItem = await MenuItemModel.create(req.body)
  res.status(201).json(menuItem)
}))


router.put('/:id', asyncHandler( async (req, res) => {
  const menuItem = await MenuItemModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  });
  res.status(201).json(menuItem);
  console.log('update success');
}))

router.delete('/:id', asyncHandler( async (req, res) => {
  const menuItem = await MenuItemModel.findByIdAndRemove(req.params.id)
  res.status(204).end();
  console.log('deletion success');
}))

router.use((req, res, next) => {
  const err = new Error('route option not found');
  err.status = 404;
  next(err);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = router;
