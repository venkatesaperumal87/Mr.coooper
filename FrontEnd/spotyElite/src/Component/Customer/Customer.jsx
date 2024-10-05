import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Customer.css';


function Customer() {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState('buy');
  const navigate = useNavigate();
  const [filteredProperties, setFilteredProperties] = useState([]);
  
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:6013/api/property');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching property data:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleFilterChange = (type) => {
    setFilter(type);
  };
  
  useEffect(() => {
    const getFilteredProperties = () => {
      setFilteredProperties(properties.filter(property => {
        return filter === (property.propertyType).toString().toLowerCase();
      }));
    };
    getFilteredProperties();
  }, [filter, properties]);

  const handleSearchClick = () => {
    navigate('/propertylist', { state: { filter } });
  };

  const handleBlockClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
    console.log("pid", propertyId);
  };

  return (
    <div className="customer-page">
      <div className="header1">
        <img src="./Images/logo1.png" alt="logo" className="logo" />
        <div className="profile">
          <button className="profile-button">Profile</button>
        </div>
      </div>
      <div className="tabs">
        <button className={`tab ${filter === 'buy' ? 'active' : ''}`} onClick={() => handleFilterChange('buy')}>Buy</button>
        <button className={`tab ${filter === 'rent' ? 'active' : ''}`} onClick={() => handleFilterChange('rent')}>Rent</button>
      </div>
      <div className="search-bar">
        <button className="search-button" onClick={handleSearchClick}>Search</button>
      </div>
      <div className="property-list">
        {filteredProperties && filteredProperties.map((property) => {
          let images = {};
          try {
            if (property.images) {
              images = JSON.parse(property.images);
            }
          } catch (e) {
            console.error('Error parsing images JSON:', e);
            images = {};
          }

          return (
            <div key={property.propertyId} className="property-card" onClick={() => handleBlockClick(property.propertyId)}>
              <h3>Property type: {property.type}</h3>
              <p>Location: {property.location}</p>
              <div className="property-status">
                <span className={`status ${property.forBuy ? 'buy' : 'rent'}`}>
                  {property.propertyType ? 'Buy' : 'Rent'}
                </span>
              </div>
              <div className="property-images">
                {Object.values(images).map((src, index) => {
                  const imagePath = src.startsWith('/') ? src : `/${src}`;
                  return (
                    <img
                      key={index}
                      src={imagePath}
                      alt={`Property ${property.propertyName} Image ${index + 1}`}
                      className="property-image"
                      onError={(e) => { e.target.onerror = null; e.target.src = '/Images/placeholder.jpg'; }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Customer;
