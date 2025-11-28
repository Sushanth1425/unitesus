import React, { useEffect, useState } from 'react'
import API from '../utils/api'

const Tasks = () => {
  const [tasks,setTasks]=useState([])
  const [query,setQuery]=useState('')
  const [status,setStatus]=useState('')

  useEffect(()=> API.get('/tasks').then(res=> setTasks(res.data)), [])

  const filtered= tasks.filter(task=> task.title.toLowerCase().includes(query.toLowerCase()) && (status ? task.status===status : true))

  return (
    <div className='p-6'>
      <h1 className='text-xl mb-4'>Task Manager</h1>
        <div className='flex gap-3 mb-4'>
          <input placeholder='Search task' onChange={e=>setQuery(e.target.value)} className='border p-2'/>
          <select onChange={e=>setStatus(e.target.value)}>
            <option value=''>All</option>
            <option>Todo</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          {filtered.map(task=>(
            <div key={task._id} className='bg-card p-3 rounded shadow hover:scale-105 transition'>
              <div className="font-medium"> {task.title} </div>
              <div className="text-muted text-sm"> {task.status} </div>
           </div>
          ))}
        </div>
    </div>
  )
}

export default Tasks