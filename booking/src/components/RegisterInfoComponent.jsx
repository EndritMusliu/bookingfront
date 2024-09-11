import React, { useState } from 'react';
import { CiCircleCheck } from "react-icons/ci";
import { GiPuzzle } from 'react-icons/gi';
import { FaMapSigns, FaSearchLocation } from 'react-icons/fa';



function RegisterInfoComponent(){
    const [openQuestion, setOpenQuestion] = useState(null);

    const toggleQuestion = (question) => {
      setOpenQuestion(openQuestion === question ? null : question);
    };
    return(
        <div className="container mt-5">
        <ul className="nav nav-tabs justify-content-center border-0">
          <li className="nav-item">
            <a className="nav-link active fw-semibold" href="#peace-of-mind">List with peace of mind</a>
          </li>
          <li className="nav-item">
            <a className="nav-link fw-semibold" href="#stand-out">Stand out from the start</a>
          </li>
 
          <li className="nav-item">
            <a className="nav-link fw-semibold" href="#faq">Your questions answered</a>
          </li>
        </ul>
  
        <div className="container mt-5">
      <div id="peace-of-mind" className="mt-5">
        <h1 className="fw-bold">List with peace of mind</h1>
        <div className="row mt-4">
          <div className="col-md-6">
            <ul className="list-unstyled">
              <li className="mb-3">
                <i className="bi bi-check-circle" style={{ color: "#0071c2" }}></i>
                <CiCircleCheck size={50}/>

                <span className="fw-bold ms-2">Damage payments</span> <br>
                </br> Our damage programme covers your property in case of damages.
              </li>
              <li className="mb-3">
                <i className="bi bi-check-circle" style={{ color: "#0071c2" }}></i>
                <CiCircleCheck size={50}/>

                <span className="fw-bold ms-2">Your own house rules</span> <br>
                </br>Communicate your house rules to potential guests who must agree to them in order to book.
              </li>
              <li className="mb-3">
                <i className="bi bi-check-circle" style={{ color: "#0071c2" }}></i>
                <CiCircleCheck size={50}/>

                <span className="fw-bold ms-3">Choose how you prefer to receive bookings</span> <br>
                </br> Either by letting guests book instantly, or by <a href="#" style={{ color: "#0071c2", textDecoration: "none" }}>reviewing booking requests</a> before accepting them.
              </li>
              <li className="mb-3">
                <i className="bi bi-check-circle" style={{ color: "#0071c2" }}></i>
                <CiCircleCheck size={50}/>

                <span className="fw-bold ms-2">Protection from liability claims</span> <br>
                </br>Receive protection against liability claims from guests and neighbours of up to €/£/$1,000,000 for each reservation.
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul className="list-unstyled">
              <li className="mb-3">
                <i className="bi bi-check-circle" style={{ color: "#0071c2" }}></i>
                <CiCircleCheck size={50} />

                <span className="fw-bold ms-2">Get paid consistently and securely</span> <br>
                </br> Get guaranteed payouts and fraud protection through <a href="#" style={{ color: "#0071c2", textDecoration: "none" }}>Payments by Booking.com</a>.
              </li>
              <li className="mb-3">
                <i className="bi bi-check-circle" style={{ color: "#0071c2" }}></i>
                <CiCircleCheck size={50}/>

                <span className="fw-bold ms-2">Verified guests</span> <br>
                </br>We verify guests' email addresses and credit cards for partners on Payments by Booking.com.
              </li>
              <li className="mb-3">
                <i className="bi bi-check-circle" style={{ color: "#0071c2" }}></i>
                <CiCircleCheck size={50}/>

                <span className="fw-bold ms-2">Robust support</span> <br>
                </br> Access support in 45 languages and manage your property through Pulse, our app for partners like you.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="container mt-5" id="stand-out">
      <h1 className="text-center mb-4">Stand out from the start</h1>
      <div className="row">
        {/* Card 1 */}
        <div className="col-md-4">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-body d-flex flex-column text-center">
              <FaMapSigns size={50} color="#febb02" className="mb-3" />
              <h4 className="fw-bold">Import your reviews</h4>
              <p className="flex-grow-1">
                We import your review score from other platforms and display it on your Booking.com property page, so you don't start at zero reviews.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-4">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-body d-flex flex-column text-center">
              <GiPuzzle size={50} color="#febb02" className="mb-3" />
              <h4 className="fw-bold">Import your property details</h4>
              <p className="flex-grow-1">
                Seamlessly import your property details and sync your availability calendar with other platforms to make it easy to list and avoid double bookings.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-4">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-body d-flex flex-column text-center">
              <FaSearchLocation size={50} color="#febb02" className="mb-3" />
              <h4 className="fw-bold">Stand out in the market</h4>
              <p className="flex-grow-1">
                The ‘New to Booking.com’ label helps you stand out in our search results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div id="faq" className="mt-5">
      <h2 className="text-center mb-4">Your questions answered</h2>

      <div className="faq-item">
        <div className='card shadow-lg border-0 p-3'>
            <div className='card-body'>
            <h5 onClick={() => toggleQuestion(1)} style={{ cursor: 'pointer' }}>
          What happens if my property is damaged by a guest? {openQuestion === 1 ? '-' : '+'}
        </h5>
        {openQuestion === 1 && (
          <p>
            Property owners can request damage deposits from guests. Deposits help cover any potential damage caused by a guest, offering some reassurance that your property will be treated respectfully. If anything goes wrong, it can be reported to our team through our misconduct reporting feature.
          </p>
        )}
            </div>
        </div>
   
      </div>
      <br></br>

      <div className="faq-item">
        <div className='card shadow-lg border-0 p-3'>
            <div className='card-body'>
            <h5 onClick={() => toggleQuestion(2)} style={{ cursor: 'pointer' }}>
          When will my property go online? {openQuestion === 2 ? '-' : '+'}
        </h5>
        {openQuestion === 2 && (
          <p>
            Once you've finished creating your listing, you can open your property for bookings on our site. We may ask you to verify your property before you can start accepting bookings, but you can use this time to get familiar with our extranet and get prepared for your first guests.
          </p>
        )}

            </div>
        </div>
  
      </div>

      <p className="mt-4">
        Still have questions? Find answers to all your questions on our <a href="#" style={{ color: "#0071c2" }}>FAQ</a>.
      </p>
    </div>
        </div>
    );
}

export default RegisterInfoComponent;