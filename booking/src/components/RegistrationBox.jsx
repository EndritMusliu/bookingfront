import React from "react";
import { FaCheck } from "react-icons/fa6";



function RegistrationBox() {
    return (
      <div
        className="container-fluid p-5"
        style={{
          backgroundColor: "darkblue",
          color: "white",
          width: '100vw',
          margin: 0,
          padding: 0,
          boxShadow: 'inset 0 10px 10px rgba(0, 0, 0, 0.5)', // Inner shadow
        }}
      >
        <div className="container p-5">
          <div className="row">
            <div className="col-md-6">
              <h1>
                List your <span style={{ color: "#0071c2" }}>property</span>
              </h1>
              <h1>on Booking.com</h1>
              <p>
                Whether hosting is your sideline passion or full-time job, list
                your home today and quickly start earning more income.
              </p>
            </div>
            <div className="col-md-6">
              <div
                className="card p-4"
                style={{ borderColor: "#febb02", borderWidth: "2px" }}
              >
                <h3>Register for free</h3>
                <ul className="list-unstyled">
                  <li>
                    <i className="bi bi-check-circle" style={{ color: "green" }}></i>{" "}
                    <FaCheck className="me-2 text-success" />
                    45% of hosts get their first booking within a week
                  </li>
                  <li>
                    <i className="bi bi-check-circle" style={{ color: "green" }}></i>
                    <FaCheck className="me-2 text-success" />
                    Choose between instant bookings and booking requests
                  </li>
                  <li>
                    <i className="bi bi-check-circle" style={{ color: "green" }}></i>
                    <FaCheck className="me-2 text-success" />
                    We handle payments for you
                  </li>
                </ul>
                <a href="/register/property">   
                <button className="btn btn-primary btn-lg w-100" >
                  Get started now
                </button></a>
     
                <p className="mt-3">
                  Already started a registration? <a href="#">Continue your registration</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default RegistrationBox;
  