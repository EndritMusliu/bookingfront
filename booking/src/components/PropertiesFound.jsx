import React from "react";
import FavoriteButton from "./FavoriteButton"; // Assuming you have this component for the heart button

function PropertiesFound({ property }) {
  return (
    <div className="card mb-3 shadow-lg border-0" style={{height:'250px'}}>
      <div className="row g-0">
        <div className="col-md-4 position-relative p-2">
          <img 
            src={property.image_url || '../prop.jpg'} // Placeholder if no image URL
            alt={property.property_name}
            className="img-fluid rounded-start rounded-2 shadow" style={{height:'235px',width:'235px'}}
          />
          <FavoriteButton className="position-absolute top-0 end-0" />
        </div>
        
        <div className="col-md-5">
          <div className="card-body border-2">
            <h5 className="card-title">{property.property_name}</h5>
            <p className="card-text text-muted">
              <a href="#">{property.street?.name}, {property.street?.city?.name}, {property.street?.city?.country?.name}</a> 

            </p>
            <p className="card-text">
 
                <small className="text-muted">Property Type:</small> {property.property_type?.name}
            </p>
            <p className="card-text">
              {property.description || 'No description available.'}
            </p>
          </div>
        </div>

        {/* Rating and Show Price Section */}
        <div className="col-md-3 d-flex flex-column align-items-end justify-content-between p-3">
          <div className="text-end">
            <span className="badge bg-success">Superb</span>
            <p className="text-muted mb-0">{property.reviews_count || 447} reviews</p>
            <div className="property-rating bg-primary text-white rounded p-2 ms-5" style={{width:'40px'}}>
              {property.rating || '9.0'}
            </div>
            <p className="text-muted">Location: {property.location_score || '9.7'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertiesFound;
