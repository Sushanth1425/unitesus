const mongoose= require('mongoose')
const bcrypt= require('bcryptjs')
require('dotenv').config()

const User= require('../models/User')

mongoose.connect(process.env.MONGO_URI)

const seedAdmin= async()=>{
  try {
    const adminExists= await User.findOne({role: 'admin'})
    if (adminExists) {
      console.log('Admin Exists already !!')
      process.exit()
    }

    const hashedPwd= await bcrypt.hash(process.env.ADMIN_PWD, 10)

    const admin= new User({
      name: 'Admin',
      email: 'admin@unitesus.com',
      password: hashedPwd,
      role: 'admin'
    })

    await admin.save()
    console.log('Admin created Successfully')
    console.log(`Admin Credentials --> email: admin@unitesus.com and password: ${process.env.ADMIN_PWD} `)
    process.exit()
  } 
  catch (err) {
    console.error(err)
    process.exit(1)
  }
}

seedAdmin()