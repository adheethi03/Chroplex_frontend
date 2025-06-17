import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import '../Styles/Login.css'

import { useNavigate } from 'react-router-dom'
const Login = () => {
 
  const navigate=useNavigate()
    const[formData,setFormData]=useState({email:"",password:"",role:""})
    const[error,seterror]=useState("")
  
  const handlechange=(e)=>
  {
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleSubmit=async(e)=>
  {
    e.preventDefault()
    try{
      
      const res=await axios.post("http://localhost:3000/api/login",formData,
        {
          withCredentials:true
        } )
        
       
        console.log(res)
      localStorage.setItem("token",res.data.token)
      localStorage.setItem("userid",JSON.stringify(res.data.user.id))
      localStorage.setItem("userimg",JSON.stringify(res.data.user.image))
      console.log(res.data.user.id)

      // alert("Login Successfull")
      if (formData.role=="admin")
      {
        
        navigate('/admin')
      }
      else{
        navigate('/user')
      }
    }
    catch(err)
  {
    seterror(err.response?.data?.message || "Login Failed")
  }
}
  
  return (
    <div className='container'>
      <h1 className='title'>CHROPLEX</h1>
      <form onSubmit={handleSubmit} className='form-display'>
        <input type="email" name="email" placeholder='Email' onChange={handlechange} required className='input-display'/>
        <input type='password' name='password' placeholder='Password' onChange={handlechange} required className='input-display'/>
        <select name="role" className='drop-down' 
        onChange={handlechange}>
          <option value="" >select role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button type='submit' className='btn'>Login</button>
        {error && <p> {error}</p>}
      </form>
    </div>
  )
}

export default Login
