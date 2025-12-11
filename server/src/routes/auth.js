const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req,res)=>{
  const {name,email,password,phone} = req.body;
  try {
    const exists = await User.findOne({email});
    if (exists) return res.status(400).json({message:'Email exists'});
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({name,email, passwordHash: hash, phone});
    await user.save();
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});
    res.json({token,user:{id:user._id,name:user.name,email:user.email}});
  } catch(err){ console.error(err); res.status(500).json({message:'Server error'})}
});

router.post('/login', async (req,res)=>{
  const {email,password} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message:'Invalid credentials'});
    const ok = await bcrypt.compare(password, user.passwordHash);
    if(!ok) return res.status(400).json({message:'Invalid credentials'});
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});
    res.json({token, user:{id:user._id,name:user.name,email:user.email}});
  } catch(err){ console.error(err); res.status(500).json({message:'Server error'})}
});

module.exports = router;
