import React from 'react'

const EmployeeCard = ({employee,onEdit,onDelete}) => {
  return (
    <div className='bg-card p-4 rounded-lg shadow-md hover:shadow-xl transition-all'>
      <h3> {employee.name} </h3>
      <p> {employee.email} </p>
      <div className='flex gap-2 mt-2'>
        <button onClick={()=>onEdit(employee)} className='text-blue-500'>Edit</button>
        <button onClick={()=>onDelete(employee._id)} className='text-red-500'>Delete</button>
      </div>
    </div>
  )
}

export default EmployeeCard