import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../Styles/moviedetails.css";
import { FaHeart, FaPlay, FaPencilAlt } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa'
import { FaInstagram,FaLinkedin } from 'react-icons/fa';

const Moviedetail = () => {
  const { title } = useParams();
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState('');
  const [review, setReview] = useState({ Comment: '', rating: '' });
  const [success, setSuccess] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate=useNavigate()
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/usr/user/${title}`);
        setMovies(res.data.movies);
      } catch (err) {
        setError('Failed to fetch details: ' + err.message);
      }
    };
    fetchMovies();
  }, [title]);

  const handlelike = async () => {
    await axios.post(`http://localhost:3000/usr/user/movies/like/${title}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userid = JSON.parse(localStorage.getItem('userid'));
      await axios.post(`http://localhost:3000/usr/user/movie/review/${title}`, {
        userid: userid,
        comment: review.Comment,
        rating: review.rating,
      });

      alert('Review posted successfully');
      setReview({ Comment: '', rating: '' });
      setSuccess('Review posted successfully!');
      setError('');

      const res = await axios.get(`http://localhost:3000/usr/user/${title}`);
      setMovies(res.data.movies);
    } catch (err) {
      setError('Failed to post review: ' + err.message);
      setSuccess('');
    }
  };

  let filenames = [];
  let actornames = [];

  if (movies && movies.Stars) {
    actornames = movies.Stars.split(",").map(actorname => actorname);
    filenames = movies.Stars.split(",").map(actor => {
      const cleanName = actor.trim().toLowerCase().replace(/ /g, "_");
      return `/actor/${cleanName}.jpg`;
    });
  }

  return (

    <div className={`container-fluid ${darkMode ? 'dark' : 'light'}`} style={{ padding: 30 }}>
      <button className="toggle-btn" onClick={toggleDarkMode}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
      <FaSignOutAlt  className="logout" onClick={()=>navigate("/user/logout")}/>
      {movies ? (
        <>
          <h1 className="heading-title">CHROPLEX</h1>
          
          <div className='p-b-image'>
            <img className="movie-poster-image" src={movies.movie_image} alt={movies.title} />
            <div className="movie-banner-container">
              <div
                className="movie-banner"
                style={{
                  backgroundImage: `url(/banners/${movies.title.replace(/\s+/g, '')}.jpg)`,
                  height: "330px"
                }}
              >
               <button
                          className="watch-trailer-btn"
                          onClick={() => {
                            if (movies.trailer_link) {
                              window.open(movies.trailer_link, "_blank");
                            } else {
                              alert("Trailer not available");
                            }
                          }}
                        >
                          <FaPlay className="play-icon" />
                          Watch Trailer
                        </button>
                <div className="banner-overlay" />
              </div>
            </div>
          </div>

          <h1 className='movie_title'>{movies.title}</h1>
          <div className='small-det'>
            <p>{movies.genre}</p>
            <p>{movies.Language}</p>
            <p>{movies.duration}</p>
            <p>{movies.Catogery}</p>
            <p>{movies.year}</p>
            <p onClick={handlelike} style={{ cursor: "pointer" }}>
              {movies.likes}<FaHeart style={{ color: 'red' }} className='heart' />
            </p>
          </div>

          <p className='movie_desc'>{movies.description}</p>
          <div className='dire-wri'>
            <p><strong>Directed By:</strong> {movies.Director}</p>
            <p><strong>Written By:</strong> {movies.writers}</p>
          </div>

          
          <div className="review-section">
            {movies.review.length > 0 ? (
              movies.review.map((review, idx) => (
                <div key={idx} className="review-card">
                  <div className='review-pan'>
                    <img
                      className='profile-pic'
                      src={review.image || '/profile/default-profile.png'}
                      alt={review.name}
                      style={{
                        width: '55px',
                        height: '55px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginRight: '10px'
                      }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <p className='review-name'><strong>{review.name || 'Anonymous'}:</strong> </p>
                  </div>
                  <div className='rev'>
                    <p>{review.comment}</p>
                    <p><strong>{review.rating} ⭐</strong></p>
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews</p>
            )}

           <p className='cre'><strong>Cast & Crew</strong></p>
                <div className="cast-container">
                  {filenames.map((path, index) => (
                    <div className="cast-member" key={index}>
                      <img className='actors' src={path} alt={`Actor ${index}`} />
                      <div className='actorname'>{actornames[index]}</div>
                    </div>
                  ))}
                </div>


            <p className="open-modal-btn">Your Review <FaPencilAlt size={20} color="#a38014" /></p>

            <div className="modal-overlay">
              <div className="modal-content">
                <form onSubmit={handleSubmit} className="review-form">
                  <textarea
                    placeholder='Your comment here.....'
                    value={review.Comment}
                    onChange={(e) => setReview({ ...review, Comment: e.target.value })}
                    required
                    rows="4"
                  />
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Give your Rating  (1 to 5)"
                    min="1"
                    max="5"
                    value={review.rating}
                    onChange={(e) => setReview({ ...review, rating: e.target.value })}
                    required
                  />
                  <button className='post-review' type="submit">Post Review</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: '#a38014' }}>{success}</p>}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading.....</p>
      )}
      {/* footer */}
      <div className='footer'>
        <h2 className='footer-head'>CONTACT US</h2>
      <div className='links'>
        <a href="https://www.instagram.com/adheethi_?igsh=MThoc2pjaGcyYXN5cA=="><FaInstagram/></a>
      <a href="https://www.linkedin.com/in/adheethiks?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedin/></a>
      </div>
      </div>
    </div>
  );
};

export default Moviedetail;
