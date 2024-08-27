import React from "react";
import FavoriteButton from "./FavoriteButton";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom



function Properties(){
    return (
        <Link to="/properties/details" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card shadow-lg" style={{ width: '18rem', borderRadius: '15px' }}>
            <div className="position-relative">
              {/* Image */}
              <img
                src="prop.jpg" 
                alt="Property"
                className="card-img-top"
                style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', height: '180px', objectFit: 'cover' }}
              />
<FavoriteButton/>
            </div>
    
            <div className="card-body">
              <h6 className="card-title">Imperial Family Bungalows</h6>
              <small className="text-muted">Ulcinj, Montenegro</small>
        
              <div className="d-flex align-items-center mt-2">
                <div className="rounded-2 px-2 py-1 me-2" style={{ backgroundColor: 'darkblue' }}>
                  <small className="text-white fw-bold">9.6</small>
                </div>
                <small className="text-muted">Exceptional · 9 reviews</small>
              </div>
            </div>
          </div>
        </Link>
      );
    
}

export default Properties;