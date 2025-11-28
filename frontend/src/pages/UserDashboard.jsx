import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import API from '../utils/api'

const UserDashboard = () => {
  const {user}= useContext(AuthContext)
  const [tasks, setTasks]= useState([])
  const [pwdForm, setPwdForm] = useState({ oldPassword: '', newPassword: '' })

  useEffect(()=>{
    if (!user) return
    API.get('/employees/me/tasks')
    .then(res => setTasks(res.data))
    .catch(err => console.error(err))
  }, [user])

  const changePassword = async ()=> {
  try {
    await API.put('/employees/me/change-password', pwdForm)
    alert('Password updated successfully')
    setPwdForm({ oldPassword: '', newPassword: '' })
  } catch (err) {
    alert(err.response?.data?.message || 'Password change failed')
  }
}


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

      <div className="mt-8 bg-card p-4 rounded">
        <h2 className="font-semibold mb-3">Change Password</h2>

        <input type="password" placeholder="Old Password" value={pwdForm.oldPassword} onChange={e => setPwdForm({...pwdForm, oldPassword: e.target.value})} className="border p-2 rounded w-full mb-2"/>

        <input type="password" placeholder="New Password" value={pwdForm.newPassword} onChange={e => setPwdForm({...pwdForm, newPassword: e.target.value})} className="border p-2 rounded w-full mb-2"/>

        <button onClick={changePassword} className="bg-primary-600 text-white px-4 py-2 rounded"> Update Password  </button>
      </div>

    </div>
  )
}

export default UserDashboard