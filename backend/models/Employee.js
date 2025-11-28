const mongoose= require('mongoose')

const employeeSchema= new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, default: 'employee'},
  dept: {type: String},
  position: {type: String},
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: Date.now}
})

module.exports= mongoose.model('Employee', employeeSchema)