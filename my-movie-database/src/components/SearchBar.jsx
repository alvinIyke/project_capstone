import React, { useState } from 'react';
import { searchMovies } from '../api/omdbApi';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await searchMovies(searchTerm);
      setMovies(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setMovies([]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search for movies or TV shows"
        className={`bg-transparent outline-none ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-800'}`}
      />
    <button type="submit">Search</button>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.imdbID}>{movie.Title}</li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
