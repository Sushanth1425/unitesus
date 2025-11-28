import React, { useEffect, useState } from 'react'
import StatCard from '../components/StatCard'
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend} from 'chart.js'
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)
import { Bar } from 'react-chartjs-2'
import API from '../utils/api'

const AdminDashboard = () => {
  const [stats, setStats]= useState({totalEmployees:0, totalTasks:0, completed:0, inProgress:0})

  useEffect(()=>{
    API.get('/dashboard')
    .then(res=> setStats(res.data))
    .catch(err=> console.error(err))
  }, [])

  const data= {
    labels: ['Total Tasks', 'Completed', 'In Progress'],
    datasets: [{label: 'Tasks', data: [stats.totalTasks, stats.completed, stats.inProgress]}]
  }

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold text-primary-600 mb-4'>Admin Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <StatCard title="Employees" value={stats.totalEmployees || 0} />
        <StatCard title="Total Tasks" value={stats.totalTasks || 0} />
        <StatCard title="Completed" value={stats.completed || 0} />
      </div>

      <div className='bg-card p-4 rounded'>
        <h2 className='font-medium mb-2'>Task Overview</h2>
        <div style={{maxWidth: 600}}> <Bar data={data} /> </div> 
      </div>
    </div>
  )
}

export default AdminDashboard