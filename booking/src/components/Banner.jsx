import React from "react";


function Banner(){
    return(
<div className="w-100 position-relative" style={{ height: '400px' }}>
      {/* Banner Image */}
      <img 
        src="/banner.jpeg" 
        alt="Banner"
        className="img-fluid"
        style={{ width: '100%', height: '100%', objectFit: 'cover', boxShadow: 'inset 0px 0px 50px rgba(0, 0, 0, 0.5)' }} 
      />

      {/* Text Overlay */}
      <div className="position-absolute top-50 start-50 translate-middle text-center" style={{ color: 'white' }}>
        <h1 className="fw-bold">
          A place to call home
          <br />
          on your next adventure
        </h1>
        <h4>Experience the joy of an entire place to yourself</h4>
      </div>
    </div>
);
}
export default Banner;