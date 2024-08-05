import React from 'react';
import './Home.css';
import {Link,useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };
  return (
    <div className="home">
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <h1>Discover Your <span>Perfect Rental</span></h1>
      <p>Rent Houses, PG and Buy the plots, flats, and House</p>
      <div className="search-bar">
        <input type="text" placeholder="Property type" />
        <input type="text" placeholder="Select Location" />
        <button>🔍</button>
      </div>
      <button className="register-btn" onClick={handleRegisterClick}>Register</button>
    </div>
  );
}

export default Home;
