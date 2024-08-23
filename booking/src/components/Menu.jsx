import React from 'react';
import { ImAirplane } from "react-icons/im";
import { IoBed } from "react-icons/io5";
import { TfiWorld } from "react-icons/tfi";
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation from react-router-dom




function Menu() {
  const location = useLocation(); // Get current route
  console.log(location);

  
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "darkblue"}}>
    <div className="container-fluid">
      <a className="navbar-brand ms-1 fw-bold" href="/">Booking.com</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mx-auto mt-5 mb-lg-0 d-flex justify-content-center">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
              >
                <div
                  className={`p-2 ${location.pathname === '/' ? 'border border-light rounded-5' : ''}`}
                >
                  <IoBed /> Stays
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link ms-4"
                to="/flights"
              >
                <div
                  className={`p-2 ${location.pathname === '/flights' ? 'border border-light rounded-5' : ''}`}
                >
                  <ImAirplane /> Flights
                </div>
              </Link>
            </li>
            </ul>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
          <a>
        <button
          className="btn bg-none rounded text-white"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          EUR
        </button>
      </a>
      <button
                  className="btn bg-none rounded text-white"
                  data-bs-toggle="modal"
                  data-bs-target="#languageModal"
                >
<TfiWorld />
</button>
          <a>
            <button  class="btn bg-none rounded text-white">
            List your property
            </button>
            </a>
            <a href='/register'>
            <button  class="btn bg-white rounded text-primary">
            Register
            </button>
            </a>
        
          </li>
          <li className="nav-item">
            <a href="/signin">            <button class="btn bg-white rounded text-primary ms-3">Sign In</button>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>


  <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Currency Selection
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
           <div className="container">
          <div className="row">
            <div className="col-md-6">
              <ul className="list-unstyled">
                <li>EUR</li>
                <li>USD</li>
                <li>JPY</li>
                <li>AZN</li>
              </ul>
            </div>
   
            <div className="col-md-6">
              <ul className="list-unstyled">
                <li>CHF</li>
                <li>LEK</li>
                <li>TRY</li>
                <li>AED</li>
              </ul>
            </div>

          </div>
        </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>






      <div
        className="modal fade"
        id="languageModal"
        tabIndex="-1"
        aria-labelledby="languageModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="languageModalLabel">
                Select Language
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Language Selection Content */}
              <form>
                <div className="mb-3">
                  <label htmlFor="language" className="form-label">Choose a language</label>
                  <select className="form-select" id="language">
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
  </>
  );
}

export default Menu;
