import React from 'react';

// Importing images from assets folder
import hostelImage from '../assets/hostels.jpeg';
import guestHouseImage from '../assets/guesthouses.jpeg';
import homestayImage from '../assets/homestays.jpeg';
import apartmentImage from '../assets/appartaments.jpeg';
import hotelImage from '../assets/hotels.jpeg';

const imageMapper = {
  'Hostels': hostelImage,
  'Guest Houses': guestHouseImage,
  'Homestays': homestayImage,
  'Apartaments': apartmentImage,
  'Hotels': hotelImage,
};

const PropertyTypeCard = ({ type }) => {
  const imageUrl = imageMapper[type.name] || hotelImage;  // Fallback image if not found

  return (
    <div style={{ textAlign: 'center', width: '200px' }}>
      <img
        src={imageUrl}
        alt={type.name}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',  // Ensures images maintain aspect ratio
          borderRadius: '10px'
        }}
      />
      <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{type.name}</p>
    </div>
  );
};

export default PropertyTypeCard;
