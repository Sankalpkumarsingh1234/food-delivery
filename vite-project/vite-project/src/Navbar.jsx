import React, { useContext, useState } from 'react';
import { assets } from './assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Storecontext } from './Storecontext.jsx';

export default function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState('home');
  const { token, logout } = useContext(Storecontext);
  const navigate = useNavigate();

  const handleMenuClick = (menuName, elementId) => {
    setMenu(menuName);
   
    if (elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="navbar">
      <Link to='/' onClick={() => setMenu("home")} className="navbar-logo">
        <img src={assets.logo} alt="logo" />
      </Link>
      <ul className="navbar-menu">
        <li>
          <Link to='/' onClick={() => handleMenuClick('home', '')} className={menu === 'home' ? 'border' : ''}>
            Home
          </Link>
        </li>
        <li>
          <a onClick={() => handleMenuClick('menu', 'explore-menu')} className={menu === 'menu' ? 'border' : ''}>
            menu
          </a>
        </li>
        <li>
          <a onClick={() => handleMenuClick('mobile-app', 'app-menu')} className={menu === 'mobile-app' ? 'border' : ''}>
            mobile-app
          </a>
        </li>
        <li>
          <a onClick={() => handleMenuClick('contact-us', 'footer')} className={menu === 'contact-us' ? 'border' : ''}>
            contact-us
          </a>
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />
        <Link to='/cart' className="navbar-cart-link">
          <div className="navbar-search-icon">
            <img src={assets.basket_icon} alt="cart" />
            <div className="dot"></div>
          </div>
        </Link>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile" />
            <button
              className="navbar-logout"
              onClick={() => {
                if (typeof logout === 'function') logout();
                navigate('/');
              }}
              style={{ marginLeft: 8 }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}