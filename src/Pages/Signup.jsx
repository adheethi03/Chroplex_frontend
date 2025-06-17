import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import '../Styles/Login.css'
const Signup = () => {
  const[formdata,setFormData]=useState({
    name:"",
    email:"",
    password:"",
    confirmpassword:""
  })
  const [imageFile, setImageFile] = useState(null);
  const[error,seterror]=useState("")
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handlechange=(e)=>
  {
    setFormData({...formdata,[e.target.name]:e.target.value})
  }
  const handleSubmit= async(e)=>
  {
    e.preventDefault()
    const{name,email,password,confirmpassword}=formdata
    if(password.length<4)
    {
    seterror("password must be contain atleast 4 character")
    return
    }
    if(password!=confirmpassword)
    {
      seterror('PASSWORD DO NOT MATCH')
      return
    }
    const formData = new FormData();

    Object.entries(formdata).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (imageFile) {
      formData.append('image', imageFile);
    }
    try{
      const res= await axios.post("http://localhost:3000/api/signup",formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
    })
    console.log(res.data)
    alert("successfull")
    }
    
 
  catch(error)
  {
    seterror(error.response?.data?.message || "Accont creation Failed")
  }
}

  return (
    <div className='container'>
      <h1 className='title'>CHROPLEX</h1>
      <form onSubmit={handleSubmit} className='form-display'>
        <input type="text"
        name="name"
        placeholder='Name'
        value={formdata.name}
        onChange={handlechange} 
        required
        className='input-display'
        />


        <input type="email"
        name='email'
        placeholder='Email'
        value={formdata.email}
        onChange={handlechange} 
        className='input-display'
        required/>


        <input type="password"
        name="password"
        placeholder='Password'
        value={formdata.password} 
        required
        onChange={handlechange}
        className='input-display'/>


        <input type="text"
        name="confirmpassword"
        placeholder='Confirm Password' 
        value={formdata.confirmpassword}
        onChange={handlechange}
        required
        className='input-display'/>
        <div className='dp'>
          <label htmlFor="" className='labeldp'>Add your Profile Picture</label>
          <input className='img-file' type="file" name="image" accept="image/*" onChange={handleImageChange} />
        
        </div>
   

        {error && <p className='error'>{error}</p>}
        <button type='submit' className='btn'>Sign up</button>
      </form>
    </div>
  )
}

export default Signup
