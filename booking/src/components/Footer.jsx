import React from "react";

function Footer(){
    return(
        <footer className="bg-light text-dark py-5 mt-auto shadow">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h6 className="fw-bold">Support</h6>
              <ul className="list-unstyled">
                <li>Coronavirus (COVID-19) FAQs</li>
                <li>Manage your trips</li>
                <li>Contact Customer Service</li>
                <li>Safety resource centre</li>
              </ul>
            </div>
   
            <div className="col-md-3">
              <h6 className="fw-bold">Terms and settings</h6>
              <ul className="list-unstyled">
                <li>Privacy & cookies</li>
                <li>Terms and conditions</li>
                <li>Partner dispute</li>
                <li>Modern Slavery Statement</li>
                <li>Human Rights Statement</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h6 className="fw-bold">Partners</h6>
              <ul className="list-unstyled">
                <li>Extranet login</li>
                <li>Partner help</li>
                <li>List your property</li>
                <li>Become an affiliate</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h6 className="fw-bold">About</h6>
              <ul className="list-unstyled">
                <li>About Booking.com</li>
                <li>How we work</li>
                <li>Sustainability</li>
                <li>Press centre</li>
                <li>Careers</li>
                <li>Investor relations</li>
                <li>Corporate contact</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );

}

export default Footer;