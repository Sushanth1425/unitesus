import { createContext, useEffect, useState } from "react";
import jwtDecode from 'jwt-decode'
import API from "../utils/api";

export const AuthContext= createContext()

export const AuthProvier= ({children})=>{
  const [user, setUser]= useState(null)

  useEffect(()=>{
    const token= localStorage.getItem('unitesus_token')

    if (token){
      try {
        const payload= jwtDecode(token)
        setUser({id: payload.id, role: payload.role, token})
      } catch (err) {
        localStorage.removeItem('unitesus_token')
      }
    }
  }, [])

  const login= async(email, password)=>{
    const res= await API.post('/auth/login', {email, password})
    const {token, user}= res.data
    localStorage.setItem('unitesus_token', token);
    setUser({...user, token})
    return user
  }

  const logout= ()=>{
    localStorage.removeItem('unitesus_token');
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{user, setUser, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}