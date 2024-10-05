import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, LikeOutlined } from '@ant-design/icons'; 
import './PropertyList.css';
import Sidebarimp from './Sidebarimp';

const PropertyList = ({ filters }) => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const params = new URLSearchParams(filters).toString();
        const response = await axios.get(`http://localhost:6013/api/property/filter?${params}`);
        if (response.data.length === 0) {
          setError('No properties available');
        } else {
          setError('');
        }
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching property data:', error);
        setError('Error fetching properties');
      }
    };

    fetchProperties();
  }, [filters]);

  const handleBlockClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <div className="property-list">
      <h1>Property List</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="property-container">
          {properties.map((property) => {
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
              <div key={property.propertyId} className="property-item" onClick={() => handleBlockClick(property.propertyId)}>
                <h2>{property.propertyName}</h2>
                <p>Type: {property.propertyType}</p>
                <p>Location: {property.location}</p>
                <p>Price: ₹{property.amount}</p>
                <p>Status: {property.status}</p>
                <p>
                  <LikeOutlined /> {property.likes}
                </p>
                <p>
                  <EyeOutlined /> {property.views}
                </p>
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
      )}
    </div>
  );
};

export default PropertyList;
