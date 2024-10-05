import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './locationList.css';


const LocationList = ({ onFilterChange }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:6013/api/property/locations');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="location-list">
      <ul>
        {locations.map((location, index) => (
          <li key={index} onClick={() => onFilterChange(location)} className="location-item">{location}</li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
