import React from 'react';
import './ExploreMenu.css';
import { menu_list } from './assets/assets.js';
import {useState} from 'react';

export default function ExploreMenu({ category, setcategory }) {
  return (

    <section className="explore-menu" id="explore-menu">
      <h1>explore our menu</h1>
      <p className="explore-menu-text">choose a delectable array from our menu</p>

      <div className="explore-menu-grid">
        {menu_list.map((item, idx) => (
          <div
            onClick={() => setcategory(prev => (prev === item.menu_name ? 'All' : item.menu_name))}
            className="explore-menu-card"
            key={item.menu_name + idx}
          >
            <img
              className={category === item.menu_name ? 'active' : ''}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <h3>{item.menu_name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
