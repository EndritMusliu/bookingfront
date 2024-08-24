import React from "react";
import { IoBed } from "react-icons/io5";


function SearchComponent(){
    return(
        <div className="container mt-5">
        <div className="card shadow-lg border-2" style={{ borderColor: 'orange' }}>
          <div className="card-body p-3">
            <div className="row g-3 align-items-center">
              
              {/* Where are you going input */}
              <div className="col-md-4">
                <input 
                  type="text" 
                  placeholder="Where are you going?" 
                  className="form-control border-0" 
                  style={{ height: '50px' }}
                />
              </div>
  
              {/* Starting Date input */}
              <div className="col-md-3">
                <input 
                  type="date" 
                  className="form-control border-0" 
                  style={{ height: '50px' }}
                />
              </div>
  
              {/* End Date input */}
              <div className="col-md-3">
                <input 
                  type="date" 
                  className="form-control border-0" 
                  style={{ height: '50px' }}
                />
              </div>
  
              {/* Search Button */}
              <div className="col-md-2">
                <button className="btn btn-primary w-100" style={{ height: '50px' }}>
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