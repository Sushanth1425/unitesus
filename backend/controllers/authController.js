const User= require('../models/User')
const Employee= require('../models/Employee')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')

//  api/auth/register
module.exports.registerAuth= async(req, res)=>{
  try {
    const {name, email, password, role}= req.body

    const userExists= await User.findOne({email})
    if (userExists) return res.status(400).json({message: 'User already exists'})

    const hashedPwd= await bcrypt.hash(password, 10)
    const newUser= new User({name, email, password: hashedPwd, role})
    await newUser.save()

    const payload= {id: newUser._id}
    const token= jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'})

    return res.status(201).json({message: 'User Created Successfully !!', token, user: {id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role}})
  }
  catch (err) {
    console.error(err)
    return res.status(500).json({message: 'Server error! Try again !!'})
  }
}

//  api/auth/login
module.exports.loginAuth= async(req, res)=>{
  try{
    const {email, password}= req.body
    if (!email || !password) return res.status(400).json({message: "All fields are required!"})

    let account= await User.findOne({email})
    let role= 'admin'

    if (!account) {
      account= await Employee.findOne({email})
      role= 'employee'
    }
    if (!account) return res.status(400).json({ message: "Invalid credentials" })

    
    const validPwd= await bcrypt.compare(password, account.password);
    if (!validPwd) return res.status(400).json({message: 'Invalid credentials'})

    const payload= {id: account._id, role}
    const token= jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'})

    return res.status(200).json({message: 'Logged In Successfully !!', token, user: {id: account._id, name: account.name, email: account.email, role}})
  }
  catch(err){
    console.error(err)
    return res.status(500).json({message: 'Server error! Try again !!'})
  }
}