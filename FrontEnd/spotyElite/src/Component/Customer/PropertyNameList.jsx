import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './propertyNameList.css';

const PropertyNameList = ({ onFilterChange }) => {
  const [propertyNames, setPropertyNames] = useState([]);

  useEffect(() => {
    const fetchPropertyNames = async () => {
      try {
        const response = await axios.get('http://localhost:6013/api/property/property-names');
        setPropertyNames(response.data);
      } catch (error) {
        console.error('Error fetching property names:', error);
      }
    };

    fetchPropertyNames();
  }, []);

  return (
    <div className="property-name-list">
      <ul>
        {propertyNames.map((name, index) => (
          <li key={index} onClick={() => onFilterChange(name)} className="property-name-item">{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyNameList;
