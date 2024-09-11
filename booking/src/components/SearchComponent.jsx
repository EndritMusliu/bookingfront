import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

function SearchComponent({ initialLocation = "", initialStartDate = "", initialEndDate = "" }) {
  const [location, setLocation] = useState(initialLocation);  
  const [startDate, setStartDate] = useState(initialStartDate); 
  const [endDate, setEndDate] = useState(initialEndDate);     
  const navigate = useNavigate();  

  useEffect(() => {
    setLocation(initialLocation);
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
  }, [initialLocation, initialStartDate, initialEndDate]);

  const handleSearch = () => {
    if (!location) {
      alert("Please enter a location");
      return;
    }

    const searchParams = new URLSearchParams({
      search: location,
      start_date: startDate,
      end_date: endDate,
    });

    navigate(`/search/results?${searchParams.toString()}`);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-3" style={{ borderColor: 'orange' }}>
        <div className="card-body p-3">
          <div className="row g-3 align-items-center">
            <div className="col-md-4 border-end border-warning">
              <input 
                type="text" 
                placeholder="Where are you going?" 
                className="form-control border-0" 
                style={{ height: '50px' }}
                value={location}    
                onChange={(e) => setLocation(e.target.value)} 
              />
            </div>
            <div className="col-md-3 border-end border-warning">
              <input 
                type="date" 
                className="form-control border-0" 
                style={{ height: '50px' }}
                value={startDate}    
                onChange={(e) => setStartDate(e.target.value)}  
              />
            </div>
            <div className="col-md-3">
              <input 
                type="date" 
                className="form-control border-0" 
                style={{ height: '50px' }}
                value={endDate}    
                onChange={(e) => setEndDate(e.target.value)}  
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100" style={{ height: '50px' }} onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
