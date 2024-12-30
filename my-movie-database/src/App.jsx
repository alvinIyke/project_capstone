import React,{ useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
//import SearchBar from './components/SearchBar';
//import MovieDetails from './MovieDetails';

import './index.css'

function App() {
  const [darkMode, setDarkMode] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };



  return (
    
     <BrowserRouter>
      <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <Nav />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<SearchBar />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>

      </div>
       
    </BrowserRouter>

  )
}

export default App
