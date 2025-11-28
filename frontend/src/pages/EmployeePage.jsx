import React, { useEffect, useState } from 'react'
import API from '../utils/api'
import EmployeeCard from '../components/EmployeeCard'

const EmployeePage = () => {
  const [employees, setEmployees]= useState([])
  const [form, setForm]= useState({name:'', email:'', password:''})
  const [editId, setEditId]= useState(null)

  const fetchEmp= async()=> {
    try {
      const res= await API.get('/employees')
      setEmployees(res.data)
    } 
    catch (err) {
      console.error(err)
    }
  }
  
  useEffect(()=>{
    const load = async () => {
      await fetchEmp()
    }
    load()
  }, [])

  const handleSubmit= async()=> {
    if (!form.name || !form.email) return alert("Fill all fields !!")

    try{
      if (editId) await API.put(`/employees/${editId}`, form)
      else await API.post('/employees', form)
      
      setForm({name: '', email: '', password: ''})
      setEditId(null)
      fetchEmp()
    }
    catch(err){
      console.error(err)
    }
  }

  const handleEdit= (emp)=>{
    setForm({name: emp.name, email: emp.email})
    setEditId(emp._id)
  }

  const handleDelete= async(id)=>{
    if (!window.confirm("Delete this employee?")) return

    try {
      await API.delete(`/employees/${id}`)
      fetchEmp()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='p-6'>
      <h1 className='text-xl mb-4'>Employee Management</h1>
      <div className='flex gap-2 mb-6'>
        <input type="text" placeholder='Name' value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="border px-3 py-2 rounded w-60" />
        <input type="text" placeholder='Email' value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className="border px-3 py-2 rounded w-60" />
        <input type="password" placeholder='Password' value={form.password} onChange={e=>setForm({...form, password: e.target.value})} className="border px-3 py-2 rounded w-60" />
        <button onClick={handleSubmit} className='bg-primary-600 text-white px-3 rounded'>{editId ? 'Update' : 'Add'}</button>
      </div>
      <div className='grid md:grid-cols-3 gap-4'>
        {employees.map(emp=> <EmployeeCard key={emp._id} employee={emp} onEdit={handleEdit} onDelete={handleDelete} />)} 
      </div>
    </div>
  )
}

export default EmployeePage