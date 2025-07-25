import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Login.css';
import { useNavigate } from 'react-router-dom';
import {FaArrowLeft } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { FaCheckCircle } from "react-icons/fa";
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const api_url = "https://movie-review-authetication.onrender.com/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmpassword } = formData;

    if (password.length < 4) {
      setError("Password must contain at least 4 characters");
      return;
    }

    if (password !== confirmpassword) {
      setError("Passwords do not match");
      return;
    }

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });

    if (imageFile) {
      formPayload.append('image', imageFile);
    }

    try {
      const res = await axios.post(`${api_url}api/signup`, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

    toast.success("Sign up succesfull!", {
        icon: <FaCheckCircle color="#efbb1c" size={20} />
      });
      navigate("/user/logout"); 
    } catch (error) {
      setError(error.response?.data?.message || "Account creation failed");
    }
  };

  return (
    <div className='container'>
      <FaArrowLeft
            
            onClick={() => navigate(-1)}
            className="arrow"
            title="Go Back"/>
      <h1 className='title'>CHROPLEX</h1>
      <form onSubmit={handleSubmit} className='form-display'>
        <input
          type="text"
          name="name"
          placeholder='Name'
          value={formData.name}
          onChange={handleChange}
          required
          className='input-display'
        />

        <input
          type="email"
          name="email"
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          required
          className='input-display'
        />

        <input
          type="password"
          name="password"
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
          required
          className='input-display'
        />

        <input
          type="password"
          name="confirmpassword"
          placeholder='Confirm Password'
          value={formData.confirmpassword}
          onChange={handleChange}
          required
          className='input-display'
        />

        <div className='dp'>
          <label htmlFor="image" className='labeldp'>Add your Profile Picture</label>
          <input
            id="image"
            className='img-file'
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {error && <p className='error'>{error}</p>}

        <button type='submit' className='btn'>Sign up</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Signup;
