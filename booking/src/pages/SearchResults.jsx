import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropertyService from '../services/PropertyService';
import PropertyTypeService from '../services/PropertyTypeService'; // Assuming this exists
import PropertyFeatureService from '../services/PropertyFeatureService'; // Assuming this exists to fetch property features
import SearchComponent from '../components/SearchComponent';
import PropertiesFound from '../components/PropertiesFound'; // Import the new component

function SearchResults() {
  const [properties, setProperties] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyFeatures, setPropertyFeatures] = useState([]);
  const location = useLocation();

  
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get('search') || '';
  const startDate = query.get('start_date') || '';
  const endDate = query.get('end_date') || '';

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        if (searchQuery) {
          const response = await PropertyService.getAllPropertiesBySearch(searchQuery);
          setProperties(response.data);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [location, searchQuery]);

  useEffect(() => {
    PropertyTypeService.getAllPropertyTypes()
      .then((response) => {
        setPropertyTypes(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching property types:', error);
      });
  }, []);

  useEffect(() => {
    PropertyFeatureService.getAllPropertyFeatures() // Assuming this API call exists
      .then((response) => {
        setPropertyFeatures(response.data); // Store features in state
      })
      .catch((error) => {
        console.error('Error fetching property features:', error);
      });
  }, []);

  return (
    <div className="container">
      <SearchComponent 
        initialLocation={searchQuery} 
        initialStartDate={startDate} 
        initialEndDate={endDate} 
      />

     
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="filter-section p-3 shadow-sm">
            <h5>Filter by:</h5>
            <div className="filter-options">
              <small className='text-muted'>Facilities</small>
  {propertyFeatures.length > 0 ? (
    propertyFeatures.map((feature) => (
      <div key={feature.id} className="form-check">
        <input 
          type="checkbox" 
          className="form-check-input" 
          id={`feature-${feature.id}`} 
        />
        <label 
          className="form-check-label" 
          htmlFor={`feature-${feature.id}`}>
          {feature.name}
        </label>
      </div>
    ))
  ) : (
    <p>Loading features...</p>
  )}
</div>  
   <div className="filter-options mt-4">
              <small className='text-muted'>Property Types</small>
  {propertyTypes.length > 0 ? (
    propertyTypes.map((feature) => (
      <div key={feature.id} className="form-check">
        <input 
          type="checkbox" 
          className="form-check-input" 
          id={`feature-${feature.id}`} 
        />
        <label 
          className="form-check-label" 
          htmlFor={`feature-${feature.id}`}>
          {feature.name}
        </label>
      </div>
    ))
  ) : (
    <p>Loading features...</p>
  )}
</div>
<button className='btn rounded-pill btn-icon btn-outline-primary shadow mt-3'>Filter</button>

            </div>
          
        </div>

        <div className="col-md-9">
          <div className="property-list">
            {properties.length > 0 ? (
              properties.map((property) => (
                <PropertiesFound key={property.id} property={property} />
              ))
            ) : (
              <p>No properties found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
