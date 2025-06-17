import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../Styles/home.css"
const Home = () => {
  const navigate=useNavigate()
  return (
    <div className='container'>
      
      <h1 className='title-name' data-text="CHROPLEX">CHROPLEX</h1>
      <button className='strt-btn' onClick={()=>navigate('/Ls')}>GET STARTED</button>
    </div>
  )
}

export default Home
