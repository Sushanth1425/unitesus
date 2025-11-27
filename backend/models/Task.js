const mongoose= require('mongoose')

const taskSchema= new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String},
  assignedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true},
  status: {type: String, enum: ['Todo', 'In Progress', 'Completed'], default: 'Todo'},
  priority: {type: String, enum: ['Low', 'Medium', 'High'], default: 'Low'},
  dueDate: {type: Date},
  createdAt: {type: Date, default: Date.now}
})

module.exports= mongoose.model('Task', taskSchema)