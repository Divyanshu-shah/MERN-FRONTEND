import React from 'react'
import App, { AppContext } from '../App'
import { useContext,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Logout() {
  const {user,setUser} = useContext(AppContext)
const Navigate = useNavigate()
  useEffect(()=>{
    setUser({})
    Navigate("/")
  },{})
  return (
    <div>Logout</div>
  )
}
