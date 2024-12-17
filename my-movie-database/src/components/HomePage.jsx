import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import fetchUserData from '../api/fetchUserData';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await fetchUserData(searchTerm, location, minRepos);
      setUserData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setUserData(null);
    }
  };
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Search for GitHub Users</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="search-term" className="text-sm font-medium">GitHub Username:</label>
          <input
            type="text"
            id="search-term"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="github-username"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="location" className="text-sm font-medium">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="city, country"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="min-repos" className="text-sm font-medium">Minimum Repositories:</label>
          <input
            type="number"
            id="min-repos"
            value={minRepos}
            onChange={(event) => setMinRepos(event.target.value)}
            placeholder="10"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
      {error ? (
        <p className="text-red-500 text-sm mt-4">{error}</p>
      ) : userData ? (
        <div className="mt-4">
          <h2 className="text-lg font-bold">User Information</h2>
          <img src={userData.avatar_url} alt={userData.name} width="100" height="100" className="rounded-lg" />
          <h3 className="text-sm font-medium">
            <Link to={`/user/${userData.login}`} className="text-blue-500 hover:text-blue-700">
              {userData.name} ({userData.login})
            </Link>
          </h3>
        </div>
      ) : null}
    </div>
  );
}

export default Search;
