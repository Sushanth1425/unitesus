import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import API from '../utils/api'

const UserDashboard = () => {
  const {user}= useContext(AuthContext)
  const [tasks, setTasks]= useState([])

  useEffect(()=>{
    if (!user) return
    API.get(`/tasks/user/${user.id}`)
    .then(res => setTasks(res.data))
    .catch(err => console.error(err))
  }, [user])

  return (
    <div className='p-6'>
      <h1 className="text-2xl font-semibold mb-4 text-primary-600">My Tasks</h1>
      <div className="space-y-3">
        {tasks.map(taks=>(
          <div key={taks._id} className='bg-card p-3 rounded flex justify-between'>
            <div>
              <div className="font-medium"> {taks.title} </div>
              <div className="text-muted text-sm"> {taks.description} </div>
            </div>
            <div className="text-sm"> {taks.status} </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserDashboard