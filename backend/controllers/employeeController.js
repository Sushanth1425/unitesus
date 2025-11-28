const Employee= require('../models/Employee')
const Task= require('../models/Task')
const bcrypt= require("bcryptjs")

module.exports.createEmployee= async (req, res)=>{
  try {
    const {name, email, password}= req.body
    if (!name || !email || !password) return res.status(400).json({message: 'All fields required'})

    const existing= await Employee.findOne({email})
    if (existing) return res.status(400).json({message: "Employee already exists"})
    const hashedPassword= await bcrypt.hash(password, 10)
    const employee= new Employee({name, email: email.trim(), password: hashedPassword, createdBy: req.user.id})
    await employee.save()

    return res.status(201).json({message: "Employee created successfully", employee})
  } 
  catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports.getEmployees= async(req, res)=>{
  try {
    const employees= await Employee.find();
    return res.status(200).json(employees)
  } 
  catch (err) {
    console.error(err)
    return res.status(500).json({message: 'Server error! Try again !!'})
  }
}

module.exports.updateEmployee= async(req, res)=>{
  try {
    const employee= await Employee.findByIdAndUpdate(req.params.id, req.body, {new: true})
    return res.status(200).json({message: 'Updated employee details: '},employee)
  } catch (err) {
    console.error(err)
    return res.status(500).json({message: 'Server error! Try again !!'})
  }
}

module.exports.deleteEmployee= async(req, res)=>{
  try {
    await Employee.findByIdAndDelete(req.params.id)
    return res.status(200).json({message: 'Deleted employee !! '})
  } catch (err) {
    console.error(err)
    return res.status(500).json({message: 'Server error! Try again !!'})
  }
}

module.exports.employeeDashboard= async(req, res)=>{
  const tasks = await Task.find({assignedTo: req.employee._id})
  res.json(tasks)
}

module.exports.changeEmployeePassword = async(req, res)=>{
  try {
    const {oldPassword, newPassword}= req.body
    const employee= await Employee.findById(req.employee._id)
    if (!employee) return res.status(404).json({ message: 'Employee not found' })
    const isMatch= await bcrypt.compare(oldPassword, employee.password)
    if (!isMatch) return res.status(400).json({ message: 'Old password incorrect' })

    employee.password= await bcrypt.hash(newPassword, 10)
    await employee.save()

    res.status(200).json({ message: 'Password updated successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error changing password' })
  }
}