import { motion } from 'framer-motion'

const EmployeeCard = ({employee, onEdit, onDelete}) => {
  return (
    <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3 }} className="bg-card p-4 rounded-xl shadow hover:shadow-lg">
      <h3 className="font-semibold text-lg">{employee.name}</h3>
      <p className="text-muted text-sm">{employee.email}</p>

      <div className="flex gap-3 mt-3">
        <button onClick={() => onEdit(employee)}className="text-primary-600 px-4 p-2 rounded-md hover:underline">Edit</button>
        <button onClick={() => onDelete(employee._id)} className="text-red-500 px-4 p-2 rounded-md hover:underline">Delete</button>
      </div>
    </motion.div>
  )
}

export default EmployeeCard