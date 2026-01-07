import React from 'react';
import './Footer.css';
import { assets } from './assets/assets.js';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid reprehenderit labore cupiditate autem. Possimus provident impedit mollitia explicabo veniam, obcaecati doloribus sapiente aut quaerat, quos cumque? Laboriosam voluptate quos saepe.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook" />
            <img src={assets.twitter_icon} alt="twitter" />
            <img src={assets.linkedin_icon} alt="linkedin" />
          </div>
        </div>
        <div className="footer-content-centre">
          <h3>COMPANY</h3>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h3>GET IN TOUCH</h3>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        <p className="footer-copyright">Copyright 2024 © Tomato.com - All Right Reserved.</p>
      </div>
    </div>
  );
}