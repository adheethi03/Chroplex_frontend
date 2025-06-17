import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from 'react-bootstrap';
import '../Styles/userhome.css';
import axios from 'axios';
import { useParams } from "react-router-dom";

function User() {
  const [movies, setMovies] = useState([]);
  const [groupedMovies, setGroupedMovies] = useState({});
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  const handleposterclick = (movie) => {
    const etitle = encodeURIComponent(movie.title);
    navigate(`/movies/${etitle}`);
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    // Load Bootstrap CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:3000/adm/admin/movies/show");

        const moviesArray = res.data.movies;

        const uniqueTitles = new Set();
        const uniqueMovies = moviesArray.filter(movie => {
          if (uniqueTitles.has(movie.title)) return false;
          uniqueTitles.add(movie.title);
          return true;
        });

        setMovies(uniqueMovies);
        groupByGenre(uniqueMovies);
      } catch (err) {
        setError(`Failed to fetch movies: ${err.message}`);
      }
    };

    fetchMovies();
  }, []);

  const groupByGenre = (movies) => {
    const grouped = {};
    movies.forEach(movie => {
      const genre = movie.genre || "Unknown";
      if (!grouped[genre]) grouped[genre] = [];
      grouped[genre].push(movie);
    });
    setGroupedMovies(grouped);
  };

  return (
    <div className={`container-fluid ${darkMode ? 'dark' : ''}`} style={{ padding: 30 }}>
      <div className="theme-toggle">
        <button onClick={toggleDarkMode} className="toggle-btn">
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <h1 className='heading-title'>CHROPLEX</h1>
      <h2 className="subheading">WELCOME USER</h2>

      <Carousel className="imgs">
        {[
          "https://images.plex.tv/photo?size=large-1280&url=https:%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F356473%2Fbackgrounds%2F672e034a0a4dc.jpg",
          "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2023/06/leo-3-1687403640.jpg",
          "https://wallpapercave.com/wp/wp14871178.webp",
          "https://assets.thehansindia.com/h-upload/2024/12/21/1508572-marco-movie-review-an-action-packed-thriller-with-intense-fight-sequences.jpg",
          "https://wallpapercave.com/wp/wp8218910.jpg",
          "https://www.moviehdwallpapers.com/wp-content/uploads/2014/03/Interstellar-2014-Movie1.jpg",
          "https://www.gethucinema.com/wp-content/uploads/2017/10/Mersal-Movie-HD-Posters-2.jpg",
          "https://images.indianexpress.com/2023/12/goat-vijay-1600.jpeg?w=640"
        ].map((src, index) => (
          <Carousel.Item key={index} interval={3000}>
            <img className="d-block w-100" src={src} alt={`Slide ${index + 1}`} />
          </Carousel.Item>
        ))}
      </Carousel>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="genre-wrapper">
        {Object.keys(groupedMovies).map((genre, index) => (
          <div key={index} className="genre-block">
            <h3 className="genre-heading">{genre}</h3>
            <div className="movie-grid">
              {groupedMovies[genre].map((movie) => (
                <div key={movie._id} className="movie-card">
                  <img
                    src={movie.movie_image}
                    alt={movie.title}
                    onClick={() => handleposterclick(movie)}
                    style={{ cursor: 'pointer' }}
                    className='movie_poster'
                  />
                  <h3 className='movie_title'>{movie.title}</h3>
                  <p className='movie_genre'>{movie.genre}</p>
                  <p className='movie_desc'>{movie.description?.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
