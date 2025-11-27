const jwt= require('jsonwebtoken')
const User = require('../models/User')

const verifyToken= async (req, res, next)=>{
  try {
    const authHeader= req.header('Authorization')
    if (!authHeader) return res.status(401).json({message: 'No token, access denied'})
    
    const token= authHeader.split(' ')[1];
    if (!token) return res.status(401).json({message: 'No token'})

    const decoded= jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ msg: 'Invalid token user' });

    req.user = user;
    next();
  } 
  catch (err) {
    console.error(err);
    res.status(401).json({message: 'Token invalid or expired'});
  }
}

module.exports= verifyToken