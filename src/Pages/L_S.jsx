import React from 'react'
import "../Styles/login_signup.css"
import { useNavigate } from 'react-router-dom'
const L_S = () => {
  const navigate=useNavigate()
  return (
    <div>
       <div className='container'>
        <h1 className='title'>CHROPLEX</h1>
      <button className='btn'  onClick={()=>navigate('/login')} > Login</button>
      <button className='btn' onClick={()=>navigate("/signup")}>Sign Up</button>
    </div>
    </div>
  )
}

export default L_S