const mongoose= require('mongoose')

const connetDB= async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI) 
    console.log(`DB connected to ${mongoose.connection.host}`)
  } 
  catch (err) {
    console.error(" MongoDB Connection Failed", err.message)
  }
}

module.exports= connetDB