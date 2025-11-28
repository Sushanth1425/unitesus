import React, { useContext, useEffect, useState } from 'react'
import API from '../utils/api'
import { AuthContext } from '../context/AuthContext'

const Tasks = () => {
  const [tasks, setTasks]= useState([])
  const [form, setForm]= useState({title: '', status: 'Todo', assignedTo: ''})
  const [editId, setEditId]= useState(null)
  const [employees, setEmployees]= useState([]);  
  const [query, setQuery]= useState('')
  const [statusFilter, setStatusFilter]= useState('')

  const {user}= useContext(AuthContext)

  const fetchTasks = async()=>{
    try {
      const res = await API.get('/tasks')
      setTasks(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchEmployees= async()=>{
    try {
      const res = await API.get('/employees'); 
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(()=>{
    const load = async () => {
      await fetchTasks()
      await fetchEmployees()
    }
    load()
  }, [])

  const handleSubmit= async()=>{
    if (!user) {
      alert('User not logged in!');
      return;
    }
    if (!form.title.trim()) {
      alert('Task title is required')
      return
    }
    if (!form.assignedTo) {
      alert('Please select an employee')
      return
    }

    const payload= {title: form.title, status: form.status, assignedTo: form.assignedTo}

    if (editId) await API.put(`/tasks/${editId}`, payload)
    else await API.post('/tasks', payload)

    setForm({title: '', status: 'Todo', assignedTo: ''})
    setEditId(null)
    fetchTasks()
  }

  const handleEdit= async(task)=>{
    setForm({title: task.title, status: task.status, assignedTo: task.assignedTo?._id || task.assignedTo})
    setEditId(task._id)
  }

  const handleDelete= async(id)=>{
    await API.delete(`/tasks/${id}`)
    fetchTasks()
  }

  const filtered= tasks.filter(task=> (task.title || '').toLowerCase().includes(query.toLowerCase()) && (statusFilter ? task.status===statusFilter : true))

  return (
    <div className='p-6'>
      <h1 className='text-xl mb-4'>Task Manager</h1>
        <div className='flex gap-3 mb-6'>
          <input placeholder='Task title' value={form.title} onChange={e=> setForm({...form, title: e.target.value})} className='border px-3 py-2 rounded w-60' />
          <select value={form.status} onChange={e=> setForm({ ...form, status: e.target.value })} className='border px-3 py-2 rounded'>
            <option>Todo</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <select value={form.assignedTo} onChange={e=> setForm({...form, assignedTo: e.target.value})} className='border px-3 py-2 rounded' >
            <option value="">Assign Employee</option>
            {employees.map(emp=>(
              <option key={emp._id} value={emp._id}>{emp.name}</option>
            ))}
          </select>
          <button onClick={handleSubmit} className="bg-primary-600 text-white px-4 py-2 rounded"> {editId ? 'Update' : 'Add'} </button>
        </div>

        <div className="flex gap-3 mb-4">
          <input placeholder="Search" onChange={e=> setQuery(e.target.value)} className="border p-2 rounded"/>
          <select onChange={e=> setStatusFilter(e.target.value)} className='border p-2 rounded'>
            <option value="">All</option>
            <option>Todo</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        <div className='grid md:grid-cols-3 gap-4'>
          {filtered.map(task=>(
            <div key={task._id} className='bg-card p-3 rounded shadow hover:shadow-xl transition'>
              <div className="font-medium"> {task.title} </div>
              <div className="text-muted text-sm"> {task.status} </div>
              <div className="flex gap-3 mt-3">
                <button className="text-blue-500 px-4 p-2 rounded-md" onClick={()=> handleEdit(task)}> Edit </button>
                <button className="text-red-500 px-4 p-2 rounded-md" onClick={()=> handleDelete(task._id)}> Delete </button>
            </div>
           </div>
          ))}
        </div>
    </div>
  )
}

export default Tasks