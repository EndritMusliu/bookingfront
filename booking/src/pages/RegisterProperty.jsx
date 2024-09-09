import React, {useEffect,useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import MealService from '../services/MealService';
import PropertyTypeService from '../services/PropertyTypeService';
import { FaBed } from "react-icons/fa";
import PropertyFeatureService from "../services/PropertyFeatureService";
import RoomFeatureService from '../services/RoomFeatureService';
import axios, { all } from 'axios';
import { useAuth } from "../context/AuthContext";
import { FaImage } from "react-icons/fa";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { PiHouseLineThin } from "react-icons/pi";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { IoFastFoodOutline } from "react-icons/io5";
import { CiTimer } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoIosResize } from "react-icons/io";
import PropertyService from '../services/PropertyService';
import RoomService from '../services/RoomService';
import ImageService from '../services/ImageService';
import FeaturesOfRoomService from '../services/FeaturesOfRoomService';
import FeaturesOfPropertyService from '../services/FeaturesOfPropertyService';
import ContinentService from '../services/ContinentService';
import CountryService from '../services/CountryService';
import CityService from '../services/CityService';
import StreetService from '../services/StreetService';
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';




function RegisterProperty() {
    const {user}=useAuth();
    const [rooms, setRooms] = useState([{}]);
    const [meals, setMeals] = useState([]);
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [loadingMeals, setLoadingMeals] = useState(true);
    const [loadingPropertyTypes, setLoadingPropertyTypes] = useState(true);
    const [propertyFeatures, setPropertyFeatures] = useState([]);
    const [selectedPropertyFeatures, setSelectedPropertyFeatures] = useState([]);
    const[roomFeatures,setRoomFeatures]=useState([]);
    const [selectedRoomFeatures,setSelectedRoomFeatures]=useState([]);
    const [query, setQuery] = useState(''); 
    const [selectedLocation, setSelectedLocation] = useState(''); 
    const [images, setImages] = useState([]);
    const [propertyName, setPropertyName] = useState("");
    const [propertyDescription, setPropertyDescription] = useState("");
    const [propertyType, setPropertyType] = useState(null);
    const [mealOffer, setMealOffer] = useState(null);
    const [checkInTime, setCheckInTime] = useState("15:00");
    const [checkOutTime, setCheckOutTime] = useState("11:00");
    const [roomName,setRoomName]=useState("");
    const [roomDescription,setRoomDescription]=useState("");
    const [roomPrice,setRoomPrice]=useState("");
    const [roomBedAmount,setRoomBedAmount]=useState("");
    const [roomSize,setRoomSize]=useState("");

    const [isSubmitting, setIsSubmitting] = useState(false); // State to track if form is submitting
    const [streetName, setStreetName] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [continent, setContinent] = useState('');

    useEffect(() => {
        if (query) {
          const locationParts = query.split(',').map(part => part.trim());
    
          if (locationParts.length === 4) {
            setStreetName(locationParts[0]);
            setCity(locationParts[1]);
            setCountry(locationParts[2]);
            setContinent(locationParts[3]);
          } else {
            console.error('Location format is invalid. Expected format: street name, city, country, continent');
          }
        }
      }, [query]);

      const navigate = useNavigate(); 

      const submitProperty = async () => {
        setIsSubmitting(true); // Disable the button when form submission starts

          try {
            const allContinents = await ContinentService.getAllContinents();
            let selectedContinentId;
            const existingContinent = allContinents.data.find(cont => cont.name === continent);
            
            if (existingContinent) {
                selectedContinentId = existingContinent.id;
            } else {
                const continentResponse = await ContinentService.createContinent({ name: continent });
                selectedContinentId = continentResponse.data.id;
            }
        
            
            const allCountries = await CountryService.getAllCountries();
            let selectedCountryId;
            const existingCountry = allCountries.data.find(c => c.name === country && c.continent.id === selectedContinentId);
            
            if (existingCountry) {
                selectedCountryId = existingCountry.id;
            } else {
                const countryResponse = await CountryService.createCountry({ 
                    name: country, 
                    continent: { id: selectedContinentId }
                });
                selectedCountryId = countryResponse.data.id;
            }
        
            const allCities = await CityService.getAllCities();
            let selectedCityId;
            const existingCity = allCities.data.find(c => c.name === city && c.country.id === selectedCountryId);
            
            if (existingCity) {
                selectedCityId = existingCity.id;
            } else {
                const cityResponse = await CityService.createCity({ 
                    name: city, 
                    country: { id: selectedCountryId }
                });
                selectedCityId = cityResponse.data.id;
            }
        
            const allStreets = await StreetService.getAllStreets();
            let selectedStreetId;
            const existingStreet = allStreets.data.find(s => s.name === streetName && s.city.id === selectedCityId);
            
            if (existingStreet) {
                selectedStreetId = existingStreet.id;
            } else {
                const streetPayload = { 
                    name: streetName, 
                    city: { 
                        id: selectedCityId, 
                        name: city, 
                        country: { 
                            id: selectedCountryId 
                        }
                    }
                };
            
                const streetResponse = await StreetService.createStreet(streetPayload);
                selectedStreetId = streetResponse.data.id;
            }
            const formatDateTime = (timeString) => {
                const today = new Date(); // Get today's date
                const datePart = today.toISOString().split('T')[0]; 
                return `${datePart} ${timeString}:00`; 
            };
            
            const formattedCheckIn = formatDateTime(checkInTime); 
            const formattedCheckOut = formatDateTime(checkOutTime);
            const propertyData = {
                property_name: propertyName,
                description: propertyDescription,
                user: user.id, 
                property_type: propertyType,  
                street: selectedStreetId, 
                meal: mealOffer,  
                check_in: formattedCheckIn, 
                check_out: formattedCheckOut, 
            };
            
                const propertyResponse = await PropertyService.createProperty(propertyData);
                const propertyId = propertyResponse.data.id;
        
                const roomData = {
                    property: propertyId,
                    price_p_n: roomPrice,
                    amount_of_beds: roomBedAmount,
                    room_name: roomName,
                    room_size: roomSize,
                    description: roomDescription,
                };
                
                let roomId; 
                
                try {
                    const roomResponse = await RoomService.createRoom(roomData);
                    roomId = roomResponse.data.id;  
                
                } catch (error) {
                    console.error("Error creating room:", error.response ? error.response.data : error.message);
                }
            // try {
            //     for (const image of images) {
            //       const formData = new FormData();
                  
            //       // Send the property ID as a regular form field, not as a JSON string
            //       formData.append('property', propertyId);
              
            //       // Attach the image file
            //       formData.append('image', image);
              
            //       // No need to set Content-Type, let FormData handle it automatically
            //       try {
            //         const response = await ImageService.createImage(formData);
            //         console.log("Image uploaded successfully:", response.data);
            //       } catch (error) {
            //         console.error("Error uploading image:", error.response ? error.response.data : error.message);
            //       }
            //     }
            //   } catch (overallError) {
            //     console.error("Error in the image upload process:", overallError);
            //   }
              
              
      
            try {
         
                for (const featureId of selectedPropertyFeatures) {
                    try {
                        await FeaturesOfPropertyService.createFeaturesOfProperty({
                            property: propertyId,
                            property_feature: {id:featureId},
                            is_available: true,
                        });
                    } catch (error) {
                        console.error(`Error creating property feature ${featureId}:`, error.response ? error.response.data : error.message);
                    }
                }
            
            } catch (error) {
                console.error("Error processing property features:", error);
            }
            
            try {

                for (const featureId of selectedRoomFeatures) {
                    try {
                        await FeaturesOfRoomService.createFeaturesOfRoom({
                            room: roomId,
                            room_feature: {id:featureId},
                            is_available: true,
                        });
                     
                    } catch (error) {
                        console.error(`Error creating room feature ${featureId}:`, error.response ? error.response.data : error.message);
                    }
                }
            
            } catch (error) {
                console.error("Error processing room features:", error);
            }
            
            toast.success('Property successfully added!', {
                position: "top-right", // Use string instead of POSITION constant
                autoClose: 3000, // Closes after 3 seconds
              });
          
              // Redirect to /stays after showing the toast
              setTimeout(() => {
                navigate('/stays'); // Redirect after the toast message is shown
              }, 3000); // Redirect after 3 seconds (same as autoClose duration)
          
            } catch (error) {
              console.error('Error submitting property:', error);
              toast.error('Error adding property. Please try again.', {
                position: "bottom-left", // Use string instead of POSITION constant
                autoClose: 3000,
              });
            }   finally {
                setIsSubmitting(false); // Re-enable the button after form submission completes or fails
              }
          };
    const [errors, setErrors] = useState({});

    const validateFields = () => {
        let newErrors = {};
        const locationRegex = /^[\d\s\w]+,\s*[a-zA-Z\s]+,\s*[a-zA-Z\s]+,\s*[a-zA-Z\s]+$/;

        const validContinents = ['Europe', 'North America', 'South America', 'Asia', 'Africa','Antarctica','Australia'];

        if (step === 1) {
            if (!query) {
              newErrors.query = 'Location is required';
            } else if (!locationRegex.test(query)) {
              newErrors.query = 'Location must be in the format: street name, city, country, continent';
            } else {
              const locationParts = query.split(',').map(part => part.trim());
        
              if (locationParts.length !== 4) {
                newErrors.query = 'Location must include street, city, country, and continent';
              } else {
        
                if (!validContinents.includes(locationParts[3])) {
                  newErrors.query = `Continent must be one of: ${validContinents.join(', ')}`;
                }
              }
            }
          if (!propertyName) newErrors.propertyName = 'Property Name is required';
          if (!propertyType) newErrors.propertyType = 'Property Type is required';
          if (!propertyDescription) newErrors.propertyDescription = 'Property Description is required';
          if (!mealOffer) newErrors.mealOffer = 'Meal Offer is required';
        }
        if(step===2){
            if (selectedPropertyFeatures.length === 0) {
                newErrors.selectedPropertyFeatures = 'At least one property feature must be selected';
              }
        }
        
        if (step === 4) {
          if (!roomName) newErrors.roomName = 'Room Name is required';
          if (!roomDescription) newErrors.roomDescription = 'Room Description is required';
          if (!roomPrice) newErrors.roomPrice = 'Price per night is required';
          if (!roomBedAmount) newErrors.roomBedAmount = 'Amount of beds is required';
          if (!roomSize) newErrors.roomSize = 'Room Size is required';
        }
        if (step === 5) {
            if (selectedRoomFeatures.length === 0) {
              newErrors.selectedRoomFeatures = 'At least one room feature must be selected';
            }
          }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
      };
    
      const nextStep = () => {
        if (validateFields()) {
          setStep(step + 1);
        }
      };
    

      const getFeatureNames = (selectedFeatures, allFeatures) => {
        // Map selected feature IDs to feature names
        return selectedFeatures
          .map(featureId => {
            const feature = allFeatures.find(f => f.id === featureId);
            return feature ? feature.name : '';
          })
          .filter(name => name !== '') // Filter out any empty names (in case the feature isn't found)
          .join(', ');
      };


      

    
    
    const handleImageChange = (e) => {
      const files = Array.from(e.target.files); // Convert FileList to Array
      setImages((prevImages) => [...prevImages, ...files]);
    };
  
    const removeImage = (indexToRemove) => {
      setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
    };
  
    // Render image previews with remove button
    const renderImagePreviews = () => {
      return images.map((image, index) => (
        <div key={index} className="col-md-3 mb-3 position-relative">
          <img
            src={URL.createObjectURL(image)}
            alt={`Preview ${index}`}
            className="img-fluid img-thumbnail"
          />
          <button
            type="button"
            className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-5"
            onClick={() => removeImage(index)}
          >
            X
          </button>
        </div>
      ));
    };
  

    
  
 
   

    
    const addRoom = () => {
        setRooms([...rooms, {}]); 
      };
  
    useEffect(() => {
      setLoadingMeals(true); 
      MealService.getAllMeals()
        .then((response) => {
          setMeals(response.data); 
          setLoadingMeals(false); 
        })
        .catch((error) => {
          console.error('Error fetching meals:', error);
          setLoadingMeals(false); 
        });
    }, []);
  
    useEffect(() => {
      setLoadingPropertyTypes(true); 
      PropertyTypeService.getAllPropertyTypes()
        .then((response) => {
          setPropertyTypes(response.data); 
          setLoadingPropertyTypes(false);
        })
        .catch((error) => {
          console.error('Error fetching property types:', error);
          setLoadingPropertyTypes(false); 
        });
    }, []);

    useEffect(() => {
        PropertyFeatureService.getAllPropertyFeatures()
          .then((response) => {
            setPropertyFeatures(response.data); 
          })
          .catch((error) => {
            console.error('Error fetching property features:', error);
          });
      }, []);

      useEffect(()=>{
        RoomFeatureService.getAllRoomFeatures()
        .then((response)=>{
            setRoomFeatures(response.data);
        })
        .catch((error)=>{
            console.error('Error fetching property features:', error);

        })

      },[]);

      const handleRoomFeatureChange=(featureId)=>{
        setSelectedRoomFeatures((prevSelected)=>
            prevSelected.includes(featureId)
        ? prevSelected.filter((id) => id !== featureId)
        : [...prevSelected, featureId]
    );
      }
    
      // Handle checkbox change
      const handlePropertyFeatureChange = (featureId) => {
        setSelectedPropertyFeatures((prevSelected) =>
          prevSelected.includes(featureId)
            ? prevSelected.filter((id) => id !== featureId)
            : [...prevSelected, featureId]
        );
      };

      

  const [step, setStep] = useState(1); 

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleTabClick = (newStep) => {
    setStep(newStep);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h5 className="fw-semibold text-muted mb-3">Property Details</h5>
            <div className="form-group">
            <div className="col-md-12 mb-2">
      <label>Enter Location </label>
      <input
        type="text"
        className={`form-control ${errors.query ? 'is-invalid' : ''}`}
        placeholder="Enter property location for ex: Street,City,Country,Continent"
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
      
      />  
                {errors.query && <div className="invalid-feedback">{errors.query}</div>}



    </div>
  <div className="row">  
        <div className="col-md-6">
      <label>Property Name</label>
      <input
              type="text"
              placeholder="Enter property name"
              className={`form-control ${errors.propertyName ? 'is-invalid' : ''}`}
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
            />
            {errors.propertyName && <div className="invalid-feedback">{errors.propertyName}</div>}
                   </div>
    <div className="col-md-6">
      <label>Property Type</label>
      <select
              className={`form-select ${errors.propertyType ? 'is-invalid' : ''}`}
              value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                 <option selected disabled>Select Property Type</option>

                    {loadingPropertyTypes ? (
                      <option>Loading...</option>
                    ) : propertyTypes.length > 0 ? (
                      propertyTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))
                    ) : (
                      <option>No Property Types Available</option>
                    )}
                  </select>
                  {errors.propertyType && <div className="invalid-feedback">{errors.propertyType}</div>}

    </div>
  </div>

  <div className="row mt-3">
    <div className="col-md-6">
      <label>Property Description</label>
      <input
                    type="text"
                    className={`form-control ${errors.propertyDescription ? 'is-invalid' : ''}`}
                    placeholder="Enter property description"
                    value={propertyDescription}
                    onChange={(e) => setPropertyDescription(e.target.value)}
                  />   
                      {errors.propertyDescription && (
              <div className="invalid-feedback">{errors.propertyDescription}</div>
            )}
                   </div>
    <div className="col-md-6">
      <label>Meal Offer</label>
      <select
              className={`form-select ${errors.mealOffer ? 'is-invalid' : ''}`}
              value={mealOffer}
                    onChange={(e) => setMealOffer(e.target.value)}
                  >
                    <option selected disabled>Select Meal Offer</option>
                    {loadingMeals ? (
                      <option>Loading...</option>
                    ) : meals.length > 0 ? (
                      meals.map((meal) => (
                        <option key={meal.id} value={meal.id}>
                          {meal.name}
                        </option>
                      ))
                    ) : (
                      <option>No Meals Available</option>
                    )}
                  </select>
                  {errors.mealOffer && <div className="invalid-feedback">{errors.mealOffer}</div>}

    </div>
    <div className="col-md-6 mt-3">
      <label>Owner</label>
      <input
        type="text"
        className="form-control"
        value={user?.first_name +" "+ user?.last_name || ''} // Set the value to the user's name if available
        disabled // Keep the field disabled
      />
    </div>

    <div className="col-md-6 mt-3">
      <div className="row">
        {/* Check In Time */}
        <div className="col-md-6">
          <label>Check In Time</label>
          <input
                    type="time"
                    className="form-control"
                    value={checkInTime}
                    onChange={(e) => setCheckInTime(e.target.value)}
                  />        </div>

        <div className="col-md-6">
          <label>Check Out Time</label>
          <input
                    type="time"
                    className="form-control"
                    value={checkOutTime}
                    onChange={(e) => setCheckOutTime(e.target.value)}
                  />        </div>
      </div>
    </div>
  </div>
</div>


    
          </div>
        );
      case 2:
        return (
            <div>
              <h5 className="fw-semibold text-muted">Property Features</h5>
              <small className="text-muted">Check what your property offers.</small>
          
              <div className="mt-3">
                {propertyFeatures.length > 0 ? (
                  <div className="row">
                    {propertyFeatures.map((feature) => (
                      <div key={feature.id} className="col-md-3 mb-2">
                        <div className="card shadow border-0">
                          <div className="card-body">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                id={`feature-${feature.id}`}
                                className="form-check-input"
                                value={feature.id}
                                onChange={() => handlePropertyFeatureChange(feature.id)}
                                checked={selectedPropertyFeatures.includes(feature.id)}
                              />
                              <label htmlFor={`feature-${feature.id}`} className="form-check-label fs-5">
                                {feature.name} {/* Adjust feature.name to the correct field */}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Loading property features...</p>
                )}
              </div>
          
              {/* Display error message for property features */}
              {errors.selectedPropertyFeatures && (
                <div className="text-danger mt-2">{errors.selectedPropertyFeatures}</div>
              )}
            </div>
          );
          
          case 3:
        return (
            <div>
            <h5 className="fw-semibold text-muted">Upload Images</h5>
            <small className="text-muted">Upload property images.</small>
            
            <div className="form-group mt-3">
              <label className="btn btn-primary btn-file rounded-5">
              +
                <input
                  type="file"
                  className="form-control-file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }} // Hide the actual input, style the label
                />
              </label>
            </div>
      
            <div className="row mt-3">
  {images.length > 0 ? (
    <div className="col-md-12">
      <h6>Image Previews</h6>
      <div className="card shadow-lg border-0 p-5">
        <div className="card-body">
          {renderImagePreviews()}
        </div>
      </div>
    </div>
  ) : (
    <div className="col-md-12">
      <h6 className="text-center">No images uploaded</h6>
    </div>
  )}
</div>

          </div>
        );
      case 4:
        return (
<div>
      <h5 className="fw-semibold text-muted">Rooms</h5>
      <small className="text-muted">Add rooms for your property.</small>

      {rooms.map((room, index) => (
        <div key={index}>
          {/* Only show <hr> if there is more than one room and it's not the first room */}
          {index > 0 && <hr />}
          
          <div className="form-group mt-3">
            <div className="">
              <div className="row mt-3">
                <div className="col-md-6">
                  <label>Room Name</label>
                  <input type="text" 
              className={`form-control ${errors.roomName ? 'is-invalid' : ''}`}
              placeholder="Enter room name"
                   value={roomName}
                   onChange={(e) => setRoomName(e.target.value)}
                    />
               <div className="invalid-feedback">{errors.roomName}</div>

                    
                </div>
                <div className="col-md-6">
                  <label>Room Description</label>
                  <input type="text"
              className={`form-control ${errors.roomDescription ? 'is-invalid' : ''}`}
              placeholder="Enter room description"
                   value={roomDescription}
                   onChange={(e)=>setRoomDescription(e.target.value)} />
                                  <div className="invalid-feedback">{errors.roomDescription}</div>

                </div>
                <div className="col-md-6 mt-3">
                  <label>Price per night</label>
                  <input type="number"
              className={`form-control ${errors.roomPrice ? 'is-invalid' : ''}`}
              placeholder="Enter price" 
                    value={roomPrice}
                    onChange={(e)=>setRoomPrice(e.target.value)}/>
                                                      <div className="invalid-feedback">{errors.roomPrice}</div>

                    
                </div>
                <div className="col-md-6 mt-3">
                  <label>Amount of beds</label>
                  <input type="number"
              className={`form-control ${errors.roomBedAmount ? 'is-invalid' : ''}`}
              placeholder="Enter amount of beds"
                   value={roomBedAmount}
                   onChange={(e)=>setRoomBedAmount(e.target.value)} />
                                                                         <div className="invalid-feedback">{errors.roomBedAmount}</div>

                </div>
                <div className="col-md-6 mt-3">
                  <label>Room Size</label>
                  <input type="number"
              className={`form-control ${errors.roomSize ? 'is-invalid' : ''}`}
              placeholder="Enter room size"
                   value={roomSize}
                   onChange={(e)=>setRoomSize(e.target.value)} />
                 <div className="invalid-feedback">{errors.roomSize}</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      ))}


      <button type="button" className="btn btn-primary mt-3 rounded-5" onClick={addRoom}>
        + 
      </button>
    </div>
  
  
        );
        case 5:
            return (
              <div>
                <h5 className="fw-semibold text-muted">Room Features</h5>
                <small className="text-muted">Check what your room offers.</small>
                <div className="mt-3">
                  {roomFeatures.length > 0 ? (
                    <div className="row">
                      {roomFeatures.map((feature) => (
                        <div key={feature.id} className="col-md-3 mb-2">
                          <div className="card shadow border-0">
                            <div className="card-body">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  id={`feature-${feature.id}`}
                                  className="form-check-input"
                                  value={feature.id}
                                  onChange={() => handleRoomFeatureChange(feature.id)}
                                  checked={selectedRoomFeatures.includes(feature.id)}
                                />
                                <label htmlFor={`feature-${feature.id}`} className="form-check-label fs-5">
                                  {feature.name} {/* Adjust feature.name to the correct field */}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>Loading room features...</p>
                  )}
                </div>
          
                {/* Display error message for room features */}
                {errors.selectedRoomFeatures && (
                  <div className="text-danger mt-2">{errors.selectedRoomFeatures}</div>
                )}
              </div>
            );
          
            case 6:
                return (
                  <div>
                    <small className="text-muted fw-semibold">Confirm information </small>
                    <div>
                        <hr></hr>
                         <div className="row">
                            <label className="fw-semibold text-muted">Property Details</label>
                            <div className="col-md-6 mt-3">
                            <label>Location <CiLocationOn /></label>
                            <h6>{ query}</h6>
                            </div> 
                            <div className="col-md-6 mt-3">
                            <label>Property Name <PiHouseLineThin />
                            </label>
                            <h6>{propertyName}</h6>
                            </div> 
                             <div className="col-md-6 mt-2">
                            <label>Property Type <CiBoxList />

                            </label>
                            <h6>{propertyType}</h6>
                            </div>  
                            <div className="col-md-6 mt-2">
                            <label>Property Description <BsReverseLayoutTextWindowReverse />

                            </label>
                            <h6>{propertyDescription}</h6>
                            </div>
                             <div className="col-md-6 mt-2">
                            <label>Meal Plan <IoFastFoodOutline />

                            </label>
                            <h6>{mealOffer}</h6>
                            </div>
                            <div className="col-md-6 mt-2">
                            <label>Check In - Check Out <CiTimer />

                            </label>
                            <h6>{checkInTime +" - "+ checkOutTime}</h6>
                            </div>   
                            <div className="col-md-6 mt-2">
                            <label>Property Features <CiCircleInfo />

                            </label>
                            <h6>{getFeatureNames(selectedPropertyFeatures, propertyFeatures)}</h6>
                            </div> 
                            <div className="col-md-6 mt-2">
  <label>Property Images <PiHouseLineThin /></label>
  <div className="row">
    {images.length > 0 ? (
      images.map((image, index) => (
        <div key={index} className="col-md-3 mb-3">
          <img
            src={URL.createObjectURL(image)} // Create a URL for each image file
            alt={`Property Image ${index + 1}`}
            className="img-fluid img-thumbnail"
          />
        </div>
      ))
    ) : (
      <h6>No images uploaded</h6>
    )}
  </div>
</div>
<hr></hr>
<label className="fw-semibold text-muted">Room Information</label>
<div className="row mt-3">
    <div className="col-md-6">
        <labeL>Room Name <PiHouseLineThin /></labeL>
        <h6>{roomName}</h6>
    </div>  
    <div className="col-md-6">
        <labeL>Room Description <BsReverseLayoutTextWindowReverse />
        </labeL>
        <h6>{roomDescription}</h6>
    </div> 
    <div className="col-md-6 mt-2">
        <labeL>Price Per Night <FaRegMoneyBillAlt />
        </labeL>
        <h6>{roomPrice}</h6>
    </div>
    <div className="col-md-6 mt-2">
        <labeL>Amount of beds <FaBed /></labeL>
        <h6>{roomBedAmount}</h6>
    </div>  
    <div className="col-md-6 mt-2">
        <labeL>Room Size <IoIosResize />
        </labeL>
        <h6>{roomSize}</h6>
    </div>
  <div className="col-md-6 mt-2">
        <labeL>Room Features <CiCircleInfo /></labeL>
        <h6>{getFeatureNames(selectedRoomFeatures, roomFeatures)}</h6>
        </div>

</div>
        </div>       
        
           <div className="d-flex justify-content-start align-items-end" style={{ position: 'relative', height: '100px' }}>
           <button
  className="btn rounded-pill btn-icon btn-outline-primary shadow"
  type="submit"
  onClick={submitProperty}
  disabled={isSubmitting} // Disable the button while submitting
>
  {isSubmitting ? 'Submitting...' : 'Add Property +'} {/* Change button text while submitting */}
</button>

    </div>

          </div>


                  </div>
                );
      default:
        return null;
    }
  };

  return (

    <div className="container mt-4"> 
    <ToastContainer />
        <div className="card shadow-lg border-0">
            <div className="card-body">

            <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link disabled  ${step === 1 ? "active" : ""}`}
            onClick={() => handleTabClick(1)}
          >
            <span className="step-number"><CiLocationOn />
            </span> Property Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link  disabled ${step === 2 ? "active " : ""}`}
            onClick={() => handleTabClick(2)}
          >
            <span className="step-number"><CiBoxList />
            </span> Property Features
          </button>
        </li>  
          <li className="nav-item">
          <button
            className={`nav-link disabled ${step === 3 ? "active " : ""}`}
            onClick={() => handleTabClick(3)}
          >
            <span className="step-number"><FaImage />

            </span> Property Images
          </button>
        </li>
        
        <li className="nav-item">
          <button
            className={`nav-link disabled ${step === 4 ? "active" : ""}`}
            onClick={() => handleTabClick(4)}
          >
            <span className="step-number"><FaBed />

            </span> Rooms
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link disabled ${step === 5 ? "active" : ""}`}
            onClick={() => handleTabClick(5)}
          >
            <span className="step-number"><MdOutlineFeaturedPlayList />

            </span> Room Features
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link disabled ${step === 6 ? "active" : ""}`}
            onClick={() => handleTabClick(6)}
          >
            <span className="step-number"><IoCheckmarkDoneOutline />
            </span> Confirm Property
          </button>
        </li>

      </ul>

      <div className="tab-content mt-4 p-4  text-dark rounded">
        {renderStepContent()}
      </div>

      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn shadow-lg "
          onClick={prevStep}
          disabled={step === 1}
        >
         <FcPrevious />

        </button>
        <button
          className="btn shadow-lg"
          onClick={nextStep}
          disabled={step === 6}
        >
         <FcNext />

        </button>
      </div>
            </div>
        </div>
     
    </div>
  );
}

export default RegisterProperty;
