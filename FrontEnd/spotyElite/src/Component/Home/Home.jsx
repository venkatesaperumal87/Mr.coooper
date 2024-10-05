// src/Home.js
import React, { useState } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleAboutClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home">
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><button onClick={handleAboutClick}>About</button></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      
      <h1>Discover Your <span>Perfect Rental</span></h1>
      <p>Rent Houses, PG and Buy the plots, flats, and House</p>
      
      <div className="search-bar">
        <button>🔍</button>
      </div>
      
      <button className="register-btn" onClick={handleRegisterClick}>Register</button>
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <section className="about-us">
          <h1>About Us</h1>
          <p>
            Welcome to Spotly Elite! We are committed to providing the best rental solutions for home workspaces, PGs, empty lands, and plots. Our team is dedicated to ensuring a seamless experience for both renters and property owners.
          </p>
        </section>
      </Modal>
      <div className="home-page">
        <section className="about-us">
          <h1>About Us</h1>
          <p>
            Welcome to Spotly Elite! We are committed to providing the best rental solutions for home workspaces, PGs, empty lands, and plots. Our team is dedicated to ensuring a seamless experience for both renters and property owners.
          </p>
        </section>

        <section className="our-missions">
          <h1>Our Missions</h1>
          <ul>
            <li>To offer transparent and reliable rental options.</li>
            <li>To facilitate easy communication between renters and property owners.</li>
            <li>To ensure real-time availability and accurate information.</li>
            <li>To provide secure and user-friendly services.</li>
          </ul>
        </section>
      </div>
    </div>
    
  );
}

export default Home;
