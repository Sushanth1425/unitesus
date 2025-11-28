import React, { useContext, useEffect, useState } from 'react'
import API from '../utils/api'
import { AuthContext } from '../context/AuthContext'

const Tasks = () => {
  const [tasks, setTasks]= useState([])
  const [form, setForm]= useState({ title: '', status: 'Todo' })
  const [editId, setEditId]= useState(null)
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

  useEffect(()=>{
    const load = async () => {
      await fetchTasks()
    }
    load()
  }, [])

  const handleSubmit= async()=>{
    if (!user) {
      alert('User not logged in!');
      return;
    }
    const payload= {...form, assignedTo: user.id}

    if (editId) await API.put(`/tasks/${editId}`, payload)
    else await API.post('/tasks', payload)

    setForm({title: '', status: 'Todo'})
    setEditId(null)
    fetchTasks()
  }

  const handleEdit= async(task)=>{
    setForm({title: task.title, status: task.status})
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
              <div className="flex gap-3">
                <button className="text-blue-500" onClick={()=> handleEdit(task)}> Edit </button>
                <button className="text-red-500" onClick={()=> handleDelete(task._id)}> Delete </button>
            </div>
           </div>
          ))}
        </div>
    </div>
  )
}

export default Tasks