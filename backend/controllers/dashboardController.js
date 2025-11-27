const Employee= require('../models/Employee')
const Task= require('../models/Task')

module.exports.dashboardData= async(req, res)=>{
  try {
    const totEmployees= await Employee.countDocuments()
    const totTasks= await Task.countDocuments()
    const completedTasks= await Task.countDocuments({status: 'Completed'})
    const inProgressTasks= await Task.countDocuments({status: 'In Progress'})

    return res.json({totEmployees, totTasks, completedTasks, inProgressTasks})
  } catch (err) {
    console.error(err)
    return res.status(500).json({message: 'Server error! Try again !!'})
  }
}