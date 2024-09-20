import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyTypeCard from './PropertyTypeCard';
import { API_URL } from '../utils/backendApi'; // Adjust based on your backend API location

const BrowseByProperty = () => {
  const [propertyTypes, setPropertyTypes] = useState([]);

  useEffect(() => {
    // Fetch property types from the backend
    const fetchPropertyTypes = async () => {
      try {
        const response = await axios.get(`${API_URL}propertytypes/`);
        setPropertyTypes(response.data);  // Ensure no duplicates are fetched here
      } catch (error) {
        console.error('Error fetching property types:', error);
      }
    };

    fetchPropertyTypes();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Browse by property type</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',  // Adds consistent spacing between items
          alignItems: 'center'
        }}
      >
        {propertyTypes.map((type) => (
          <PropertyTypeCard key={type.id} type={type} />  // Ensure key is unique here
        ))}
          {console.log(propertyTypes)}
      </div>
    </div>
  );
};

export default BrowseByProperty;
