import React, { useEffect, useState } from 'react'
import API from '../utils/api'
import EmployeeCard from '../components/EmployeeCard'

const EmployeePage = () => {
  const [employees, setEmployees]= useState([])
  const [form, setForm]= useState({name:'', email:''})

  const fetchEmp= async()=> {
    try {
      const res= await API.get('/employees')
      setEmployees(res.data)
    } 
    catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
  const load = async () => {
    await fetchEmp()
  }
  load()
}, [])

  const addEmployee= ()=> API.post('/employees', form).then(fetchEmp)

  return (
    <div className='p-6'>
      <h1 className='text-xl mb-4'>Employee Management</h1>
      <div className='flex gap-2 mb-4'>
        <input type="text" placeholder='Name' onChange={e=>setForm({...form, name: e.target.value})} />
        <input type="text" placeholder='Email' onChange={e=>setForm({...form, email: e.target.value})} />
        <button onClick={addEmployee} className='bg-primary-600 text-white px-3 rounded'>Add</button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {employees.map(emp=> <EmployeeCard key={emp._id} employee={emp} />)} 
      </div>
    </div>
  )
}

export default EmployeePage