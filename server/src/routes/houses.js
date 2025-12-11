const express = require('express');
const router = express.Router();
const House = require('../models/House');
const auth = require('../middleware/auth');

// Create a house (landlord)
router.post('/', auth, async (req,res)=>{
  try {
    const data = {...req.body, user: req.userId};
    const house = new House(data);
    await house.save();
    res.json(house);
  } catch(err){ console.error(err); res.status(500).json({message:'Server error'})}
});

// List houses (with simple query params)
router.get('/', async (req,res)=>{
  const {q,location,minPrice,maxPrice} = req.query;
  const filter = {};
  if(location) filter.location = new RegExp(location,'i');
  if(minPrice || maxPrice) filter.rent_price = {};
  if(minPrice) filter.rent_price.$gte = Number(minPrice);
  if(maxPrice) filter.rent_price.$lte = Number(maxPrice);
  if(q) filter.title = new RegExp(q,'i');
  const houses = await House.find(filter).populate('user','name email');
  res.json(houses);
});

router.get('/:id', async (req,res)=>{
  const house = await House.findById(req.params.id).populate('user','name email');
  if(!house) return res.status(404).json({message:'Not found'});
  res.json(house);
});

router.put('/:id', auth, async (req,res)=>{
  const house = await House.findById(req.params.id);
  if(!house) return res.status(404).json({message:'Not found'});
  if(String(house.user) !== req.userId) return res.status(403).json({message:'Forbidden'});
  Object.assign(house, req.body);
  await house.save();
  res.json(house);
});

router.delete('/:id', auth, async (req,res)=>{
  const house = await House.findById(req.params.id);
  if(!house) return res.status(404).json({message:'Not found'});
  if(String(house.user) !== req.userId) return res.status(403).json({message:'Forbidden'});
  await house.deleteOne();
  res.json({message:'Deleted'});
});

module.exports = router;
