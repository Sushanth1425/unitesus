const jwt= require('jsonwebtoken')
const Employee= require('../models/Employee')

const verifyEmployee= async (req, res, next)=> {
  try {
    const auth= req.header('Authorization')
    if (!auth) return res.status(401).json({message: 'No token'})
    const token= auth.split(' ')[1]
    const decoded= jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role !== 'employee')
      return res.status(403).json({message: 'Employee access only'})

    const employee= await Employee.findById(decoded.id).select('-password')
    req.employee= employee
    next()
  } 
  catch {
    res.status(401).json({message: 'Invalid token'})
  }
}

module.exports= verifyEmployee