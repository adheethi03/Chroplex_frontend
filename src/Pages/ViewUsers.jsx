import React, { useState, useEffect } from 'react';
import '../Styles/viewusers.css';
import axios from 'axios';
import { FaTrashAlt,FaArrowLeft } from 'react-icons/fa';

const ViewUsers = () => {
  const [pdata, setData] = useState([]);
  const [error, setError] = useState("");
  const api_url="https://movie-review-authetication.onrender.com/"
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${api_url}adm/admin/userslist`);
        console.log(res.data);
        setData(res.data.Users);
        // localStorage.setItem('username',res.data.name)
      } catch (error) {
        setError(`Failed to fetch: ${error.message}`);
      }
      
    };
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api_url}adm/admin/user/${id}`);
      setData(pdata.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user.");
    }
  };

  return (
    <div>
      <FaArrowLeft
            
            onClick={() => navigate(-1)}
            className="arrow"
            title="Go Back"/>
      <h1 className='heading-title'>CHROPLEX</h1>
      <h2 className='subheading'>USER - WHO HAVE ACCOUNT</h2>
      
       
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className='all-in-list'>
        <ul>
          {pdata.map((user) => (
            <div key={user._id} className="user-data">
              <div>
                <h3 className="username">{user.name}</h3>
                <p className='userdata'>Email: {user.email}</p>
                <p className='userdata'>Role: {user.role}</p>
              </div>
              <div className='trash-icon-container'>
                <button className='trash-icon' onClick={() => handleDelete(user._id)} title='Delete or restrict the user'>
                  <FaTrashAlt />
                </button>
               
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewUsers;
