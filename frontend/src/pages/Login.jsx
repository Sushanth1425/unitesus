import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { sanitizeSubmit } from '../utils/sanitize'

const Login = () => {
  const {login}= useContext(AuthContext)
  const {register, handleSubmit, formState: {errors}}= useForm()
  const nav= useNavigate()

  const onSubmit= async(data)=>{
    try {
      const email= sanitizeSubmit(data.email)
      const password= sanitizeSubmit(data.password)
      const user= await login(email, password)

      if (user.role==='admin') nav('/admin')
      else nav('/dashboard')
    } 
    catch (err) {
      alert(err.response?.data?.message || 'Login failed')
    }
  }
  
  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='max-w-md w-full bg-card p-8 rounded-xl shadow'>
        <h2 className="text-2xl font-bold text-primary-600 mb-4">Sign in to UniteSUS</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="" className="block text-sm">Email</label>
            <input type="email" {...register('email', { required: true })} className="w-full mt-1 p-2 rounded border" />
            {errors.email && <small className="text-red-500">Email is required</small>}
          </div>
          <div>
            <label htmlFor="" className="block text-sm">Password</label>
            <input type="password" {...register('password', { required: true })} className='w-full mt-1 p-2 rounded border' />
            {errors.password && <small className="text-red-500">Password is required</small>}
          </div>
          <div>
            <button className='w-full py-2 rounded bg-primary-600 hover:bg-primary-700 text-white' type='submit'> Submit </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login