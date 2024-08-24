import React from 'react';
import { FaBeer } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu'; // Import your menu
import Flights from './pages/Flights';
import Stays from './pages/Stays'
import Footer from './components/Footer'
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import SearchComponent from "./components/SearchComponent";
import Banner from './components/Banner';


function App() {
  return (
    <Router>
      <Menu /> 
      <Routes>
        <Route path="/" element={<Stays />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/searchcomponent" element={<SearchComponent />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/signin" element={<SignIn />}/>
      </Routes>
    </Router>
  );
}


export default App;
