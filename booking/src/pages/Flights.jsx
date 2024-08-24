import React,{ useState } from "react";
import Footer from "../components/Footer";
import { FaArrowRight } from "react-icons/fa";


function Flights() {
    const [showModal, setShowModal] = useState(false);
    const [passengerCounts, setPassengerCounts] = useState({
      adults: 1,
      students: 0,
      youths: 0,
      children: 0,
      toddlers: 0,
      infants: 0,
    });
  
    const handleIncrement = (type) => {
      setPassengerCounts((prev) => ({
        ...prev,
        [type]: prev[type] + 1,
      }));
    };
  
    const handleDecrement = (type) => {
      setPassengerCounts((prev) => ({
        ...prev,
        [type]: prev[type] > 0 ? prev[type] - 1 : 0,
      }));
    };
    return (
        <div className="d-flex flex-column min-vh-100">
          <div className="flex-grow-1 p-5">
            <h1 className="fw-semibold text-black">Where do you want to go?</h1>
    
            {/* Row for Trip Type, Passenger Selection, and Class */}
            <div className="d-flex align-items-center mb-4 mt-4">
              <div className="me-3">
                <select className="form-select">
                  <option value="return">Return</option>
                  <option value="one_way">One Way</option>
                </select>
              </div>
              <div className="me-3">
                <button className="btn btn-outline-secondary" onClick={() => setShowModal(true)}>
                  {passengerCounts.adults} Adult(s)
                </button>
              </div>
              <div className="me-3">
                <select className="form-select">
                  <option>Economy</option>
                  <option>Premium Economy</option>
                  <option>Business</option>
                </select>
              </div>
            </div>
    
            {/* Passenger Modal */}
            {showModal && (
              <div className="passenger-modal mt-3 p-4" style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                {Object.keys(passengerCounts).map((type) => (
                  <div key={type} className="d-flex justify-content-between align-items-center mb-3">
                    <span>
                      {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                    </span>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleDecrement(type)}>-</button>
                      <span className="mx-2">{passengerCounts[type]}</span>
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => handleIncrement(type)}>+</button>
                    </div>
                  </div>
                ))}
                <button className="btn btn-secondary mt-3" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            )}
    <div class="card shadow-lg">
        <div class="card-body">
        <div className="d-flex align-items-center mb-4 p-5">
              <div className="me-3">
                <label className="form-label">From</label>
                <input type="text" className="form-control" placeholder="Enter Departure City" />
              </div>
              <div className="me-3 d-flex align-items-center">
                <FaArrowRight className="mx-2" />
              </div>
              <div className="me-3">
                <label className="form-label">To</label>
                <input type="text" className="form-control" placeholder="Enter Destination City" />
              </div>
              <div className="me-3">
                <label className="form-label">Departure</label>
                <input type="date" className="form-control" />
              </div>
              <div className="me-3">
                <label className="form-label">Return date</label>
                <input type="date" className="form-control" />
              </div>
              <div className="me-3 mt-4"><button className="btn btn-primary rounded">Search</button>
              </div>

            </div>
        </div>
        </div>
         
 
            {/* Search Button */}
          </div>
          <Footer/>

        </div>
        
      );

}
export default Flights;


