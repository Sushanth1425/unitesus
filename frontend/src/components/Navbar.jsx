import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const {user, logout}= useContext(AuthContext)
  const [dark, setDark]= useState(localStorage.getItem('theme')==='dark')

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', dark? 'dark': 'light')
    localStorage.setItem('theme', dark? 'dark': 'light')
  }, [dark])

  const baseClass = 'px-3 py-2 rounded-md transition-all duration-200 cursor-pointer'
  const currClass = 'bg-primary-600 text-white shadow-md'

  return (
    <header className="w-full bg-card shadow-sm py-3 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-semibold text-primary-600">UNITESUS</div>
        {user && (
          <nav className='hidden md:flex gap-3 text-sm'>
            <NavLink to={user.role==='admin' ? '/admin' : '/dashboard'} className={({isActive}) => `${baseClass} ${isActive ? currClass : 'hover:bg-primary-50'}`} > Dashboard</NavLink>
            {user.role==='admin' && (
              <>
                <NavLink to='/employees' className={({isActive}) => `${baseClass} ${isActive ? currClass : 'hover:bg-primary-50'}`}>Employees</NavLink>
                <NavLink to='/tasks' className={({isActive}) => `${baseClass} ${isActive ? currClass : 'hover:bg-primary-50'}`}> Tasks </NavLink>
              </>
            )}
          </nav>
        )}
      </div>

      <div className='flex items-center gap-4'>
        <button onClick={() => setDark(!dark)} className="px-3 py-2 rounded-md border hover:bg-primary-50" aria-label="Toggle dark mode"> {dark ? '🌙 Dark' : '☀️ Light'} </button>
        {user ? (
          <div className='flex items-center gap-2'>
            <div className="text-sm">{user.name || user.email || user.id}</div>
            <button onClick={logout} className="px-3 py-2 rounded-md border">Logout</button>
          </div>
        ) : (
          <NavLink to="/login" className="px-3 py-2 rounded-md border">Login</NavLink>
        )}
      </div>
    </header>
  )
}

export default Navbar