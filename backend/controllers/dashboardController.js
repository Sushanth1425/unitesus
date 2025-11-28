const Employee= require('../models/Employee')
const Task= require('../models/Task')

module.exports.dashboardData= async(req, res)=>{
  try {
    const totalEmployees= await Employee.countDocuments()
    const totalTasks= await Task.countDocuments()
    const completed= await Task.countDocuments({status: 'Completed'})
    const inProgress= await Task.countDocuments({status: 'In Progress'})

    return res.json({totalEmployees, totalTasks, completed, inProgress})
  } catch (err) {
    console.error(err)
    return res.status(500).json({message: 'Server error! Try again !!'})
  }
}