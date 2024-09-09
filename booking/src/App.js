import React from 'react';
import { FaBeer } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Menu from './components/Menu'; // Import your menu
import Flights from './pages/Flights';
import Stays from './pages/Stays'
import Footer from './components/Footer'
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import SearchComponent from "./components/SearchComponent";
import Banner from './components/Banner';
import Properties from './components/Properties';
import FavoriteButton from './components/FavoriteButton';
import PropertyDetails from './pages/PropertyDetails';
import SearchFlight from './components/SearchFlight';
import {useAuth} from "./context/AuthContext";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUpPage";
import RegistrationBox from './components/RegistrationBox';
import ListProperty from './pages/ListProperty';
import RegisterInfoComponent from './components/RegisterInfoComponent';
import RegisterProperty from './pages/RegisterProperty';


function App() {

  const {isAuthenticated}=useAuth();

  return (
    <Router>
      {isAuthenticated && <Menu/>}
      <Routes>
        <Route path="/" element={<Navigate replace to={isAuthenticated ? "/stays" : "/login"}/>} />
        <Route path="/stays" element={isAuthenticated ? <Stays /> : <Navigate replace to="/login" />} />
        <Route path='search/flight' element={isAuthenticated ? <SearchFlight /> : <Navigate replace to="/login" />} />
        <Route path="/flights" element={isAuthenticated ? <Flights /> : <Navigate replace to="/login" />} />
        <Route path="/footer" element={isAuthenticated ? <Footer /> : <Navigate replace to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/searchcomponent" element={isAuthenticated ? <SearchComponent /> : <Navigate replace to="/login" />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/signin" element={<SignIn />}/>
        <Route path='/properties' element={<Properties/>}/>
        <Route path='/properties/details' element={isAuthenticated ? <PropertyDetails /> : <Navigate replace to="/login" />} />
        <Route path='/registration/box' element={isAuthenticated ? <RegistrationBox /> : <Navigate replace to="/login" />} />
        <Route path='/list/properties' element={isAuthenticated ? <ListProperty /> : <Navigate replace to="/login" />} />
        <Route path='/registration/info' element={isAuthenticated ? <RegisterInfoComponent /> : <Navigate replace to="/login" />} />
        <Route path='/register/property' element={isAuthenticated ? <RegisterProperty /> : <Navigate replace to="/login" />} />
        <Route path='/favoritebutton' element={<FavoriteButton/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
      </Routes>
    </Router>
  );
}


export default App;
