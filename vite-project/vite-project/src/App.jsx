import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {useState} from 'react';
import Navbar from './Navbar.jsx';
import Home from './pages/Home/Home.jsx';
import Cart from './pages/cart/cart.jsx';
import Order from './pages/Placeorder/Placeorder.jsx';
import Footer from './Footer.jsx';
import Loginpopup from './Loginpopup.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';

export default function App() {
  const [showLogin,setShowLogin]=useState(false);
  return (
    <>
    <div>
      {showLogin?<Loginpopup setShowLogin={setShowLogin}/>:<></>}
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
    <Footer/>
    </>
  );
}