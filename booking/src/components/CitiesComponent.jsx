import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/backendApi';  // Adjust the API URL as needed

const CitiesComponent = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${API_URL}properties-by-city/`);
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    };

    fetchCities();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '10px', textAlign: 'left' }}>Explore Kosovo</h2>
      <p style={{ marginBottom: '20px', textAlign: 'left' }}>These popular destinations have a lot to offer</p>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'nowrap', gap: '20px', overflowX: 'auto' }}>
        {cities.map((city, index) => (
          <div key={index} style={{ textAlign: 'center', minWidth: '150px' }}>
            <img
              src={city.image_url}
              alt={city.city}
              style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '10px' }}
            />
            <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{city.city}</p>
            <p>{city.property_count} properties</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitiesComponent;
