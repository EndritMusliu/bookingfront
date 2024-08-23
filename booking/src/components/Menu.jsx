import React from 'react';
import { ImAirplane } from "react-icons/im";
import { IoBed } from "react-icons/io5";



function Menu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "darkblue"}}>
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Booking.com</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" href="/"><IoBed /> Stays</a>
          </li>
          <li className="nav-item">
            <a className="nav-link ms-2" href="/flights"><ImAirplane /> Flights</a>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="/register">Register</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/signin">Sign In</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
}

export default Menu;
