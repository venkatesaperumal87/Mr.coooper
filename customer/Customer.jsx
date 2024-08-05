import React from 'react';
import './Customer.css';

function Customer() {
  const properties = [
    {
      image: '', // Add image URL or leave empty for no image
      type: 'Type 1',
      location: 'Location 1',
      forBuy: true
    },
    {
      image: 'https://via.placeholder.com/300', // Add image URL
      type: 'Type 2',
      location: 'Location 2',
      forBuy: true
    }
  ];

  return (
    <div className="customer-page">
      <header className="header">
        <img src="logo.png" alt="logo" className="logo" />
        <div className="profile">
          <button className="profile-button">Profile</button>
        </div>
      </header>
      <div className="tabs">
        <button className="tab active">Buy</button>
        <button className="tab">Rent</button>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Property type" className="search-input" />
        <input type="text" placeholder="Select Location" className="search-input" />
        <input type="text" placeholder="Price range" className="search-input" />
        <button className="search-button">Search</button>
      </div>
      <div className="property-list">
        {properties.map((property, index) => (
          <div key={index} className="property-card">
            {property.image && <img src={property.image} alt="property" className="property-image" />}
            <div className="property-info">
              <h3>Property type: {property.type}</h3>
              <p>Location: {property.location}</p>
              <div className="property-status">
                <span className={`status ${property.forBuy ? 'for-buy' : 'for-rent'}`}>
                  {property.forBuy ? 'For Buy' : 'For Rent'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customer;
