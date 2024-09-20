import React from "react";
import Footer from "../components/Footer";
import SearchComponent from "../components/SearchComponent";
import Banner from "../components/Banner";
import Properties from "../components/Properties";
import BrowseByProperty from "../components/BrowseByProperty";
import CitiesComponent from "../components/CitiesComponent";

function Stays(){
    return(
        <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1">
          <Banner />
          <SearchComponent />
  
          {/* Centering the Properties Component */}
          <div className="container mt-5">
            <h4 className="fw-semibold">Interested in these properties?</h4>
            <div className="row justify-content-center mt-3">
              <div className="col-md-3">
                <Properties />
              </div>
              <div className="col-md-3">
                <Properties />
              </div>
              <div className="col-md-3">
                <Properties />
              </div>
              <div className="col-md-3">
                <Properties />
              </div>
              
            </div>
          </div>
            <br/>
            <BrowseByProperty/>
            <br/>
            <CitiesComponent/>
            <br/>
        </div>
  
        <Footer />
      </div>
    );

}
export default Stays