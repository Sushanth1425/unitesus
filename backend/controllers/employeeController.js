const Employee= require('../models/Employee')

module.exports.createEmployee= async(req, res)=>{
  try{
    const newEmployee= new Employee({...req.body, createdBy: req.user._id})
    await newEmployee.save()

    return res.status(201).json({message: 'Employee created Successfully !!'}, newEmployee)
  }
  catch(err){
    console.error(err)
    return res.status(500).json({message: 'Server error! Try again !!'})
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