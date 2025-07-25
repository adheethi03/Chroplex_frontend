import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/admin.css';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaUser,FaPlus,FaInstagram, FaLinkedin,FaSignOutAlt} from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';

const Admin = () => {
  const navigate = useNavigate();
  const [dmovies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const api_url="https://movie-review-authetication.onrender.com/"
  
  useEffect(() => {
    const fetchmovies = async () => {
      try {
        const res = await axios.get(`${api_url}adm/admin/movies/show`);
        
        const moviesArray = res.data.movies;

        
        const uniqueTitles = new Set();
        const uniqueMovies = moviesArray.filter(movie => {
          if (uniqueTitles.has(movie.title)) return false;
          uniqueTitles.add(movie.title);
          return true;
        });

        setMovies(uniqueMovies);
      } catch (error) {
        setError(`Failed to fetch movies: ${error.message}`);
      }
    };

    fetchmovies();
  }, []);
const handledlt=async(title)=>
{
  try {
    console.log("before:",dmovies)
    const dltdata=await axios.delete(`${api_url}adm/admin/movies/${title}`)
    console.log(dltdata.data)
    setMovies(dmovies.filter(movie=>movie.title!==title))
    console.log("after",dmovies)
    
  } catch (error) {
    
  }
}

  return (
    <div>
      {/* Navbar */}
      <FaArrowLeft
            
            onClick={() => navigate(-1)}
            className="arrow"
            title="Go Back"/>
             <FaSignOutAlt
                        onClick={() => navigate("/user/logout")}
                        className="signout2"
                        title="Logout"
                      />
      <div className='navbar'>
        <h1 className='heading-title'>CHROPLEX</h1>
        <h2 className='subheading'>Welcome admin!</h2>
        <div className='nav'>
          
            
        
          <button className='nav-btns' onClick={() => navigate('/view_users')}>
            <FaUser className='user-icon' /> View Users
          </button>
          <button className='nav-btns' onClick={() => navigate('/add_movie')}>
            <FaPlus className='plus-icon' /> Add Movies
          </button>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="movie-grid">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {dmovies.map((movie) => (
          <div key={movie._id} className="movie-card">
           <img
                    src={movie.movie_image}
                    alt={movie.title}
                   className='movie_poster' />
            <h3 className='movie_title'>{movie.title}</h3>
            <p className='movie_genre'>
              {movie.genre}
              <button className='trash-btn' onClick={() => handledlt(movie.title)} title='delete the movie from the list'>
                <FaTrashAlt className='trash-ico' />
              </button>
            </p>
            <p className='movie_desc'>
              {movie.description?.substring(0, 100)}...
            </p>
          </div>
        ))}
      </div>
      
        <div className='footer'>
                <h2 className='footer-head'>CONTACT US</h2>
                <div className='links'>
                  <a href="https://www.instagram.com/chroplex?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><FaInstagram /></a>
                  <a href="https://www.linkedin.com/in/adheethiks?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedin /></a>
                </div>
              </div>

    </div>
    
  );
};

export default Admin;
