import React from "react";
import Footer from "../components/Footer";
import SearchComponent from "../components/SearchComponent";
import Banner from "../components/Banner";

function Stays(){
    return(
<div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        <Banner/>
        <SearchComponent/>  
        {/* Your page content goes here */}
      </div>
      <Footer />
    </div>
    );

}
export default Stays