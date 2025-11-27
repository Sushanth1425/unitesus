const Task= require('../models/Task')

module.exports.createTask= async(req, res)=>{
  try {
    const newTask= new Task(req.body)
    await newTask.save()
    return res.status(201).json({message: 'Task Created Successfully !!'}, newTask)
  } catch (err) {
    console.error(err)
    return res.status(500).json({message: 'Server error! Try again !!'})
  }
}

module.exports.getTasks= async(req, res)=>{
  try {
    const tasks= await Task.find().populate('assignedTo');
    return res.json(tasks)
  } catch (err) {
    console.error(err)
    return res.status(500).json({message: 'Server error! Try again !!'})
  }
}

module.exports.updateTask= async(req, res)=>{
  try {
    const task= await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
    return res.json({message: 'Updated task details: '}, task)
  } catch (err) {
    console.error(err)
    return res.status(500).json({message: 'Server error! Try again !!'})
  }
}

module.exports.deleteTask= async(req, res)=>{
  try {
    await Task.findByIdAndDelete(req.params.id)
    return res.status(200).json({message: 'Deleted task !! '})
  } catch (err) {
    console.error(err)
    return res.status(500).json({message: 'Server error! Try again !!'})
  }
}