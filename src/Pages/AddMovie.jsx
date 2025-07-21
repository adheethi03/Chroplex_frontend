import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/addmovie.css'
import {FaArrowLeft } from 'react-icons/fa';

function AddMovie() {
  const [moviedata, setMovieData] = useState({
    title: '',
    genre: '',
    duration: '',
    Catogery: '',
    Language: '',
    Year: '',
    Director: '',
    writers: '',
    Stars: '',
    description: '',
    trailer_link: '',
  });
  const api_url="https://movie-review-authetication.onrender.com/"
  const [imageFile, setImageFile] = useState(null); //img handle
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setMovieData({ ...moviedata, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(moviedata).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // append file
    if (imageFile) {
      formData.append('movie_image', imageFile);
    }

    try {
      const res = await axios.post(`${api_url}adm/admin/movies`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      setMessage("Movie added successfully!");
      setError("");
      console.log("Uploaded:", res.data);
    } catch (error) {
      setError(error.response?.data?.message || "Internal Server Error");
      setMessage("");
    }
    
  };

  return (
    <div>
      <FaArrowLeft
            
            onClick={() => navigate(-1)}
            className="arrow"
            title="Go Back"/>
      <h1 className='heading-title'>CHROPLEX</h1>
      <h3 className='subheading'>ADD NEW MOVIE</h3>
      <h2>ADD NEW MOVIE</h2>

      <form onSubmit={handleSubmit} className="add-movie-form" encType="multipart/form-data">
        <div className='form-row'>
        <input className='inp' type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <input className='inp' type="text" name="genre" placeholder="Genre" onChange={handleChange} required />
        <input className='inp' type="text" name="duration" placeholder="Duration" onChange={handleChange} />
        <input className='inp' type="text" name="Catogery" placeholder="Category" onChange={handleChange} />
        <input className='inp' type="text" name="Language" placeholder="Language" onChange={handleChange} />
        <input className='inp' type="number" name="Year" placeholder="Year" onChange={handleChange} />
       
       
        <input className='inp' type="text" name="Director" placeholder="Director" onChange={handleChange} />
        <input className='inp' type="text" name="writers" placeholder="Writers" onChange={handleChange} />
        <input className='inp' type="text" name="Stars" placeholder="Stars" onChange={handleChange} />
        <textarea className='inp2' name="description" placeholder="Description" onChange={handleChange}></textarea>
        <input className='inp4' type="text" name="trailer_link" placeholder="Trailer Link" onChange={handleChange} />
        <input className='inp4' type="file" name="movie_image" accept="image/*" onChange={handleImageChange} />
     </div>

        <button type="submit" className='upload-movie'>Upload Movie</button>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default AddMovie;
