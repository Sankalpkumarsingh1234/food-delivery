import React, { useContext, useState } from 'react';
import { assets } from './assets/assets.js';
import { Storecontext } from './Storecontext.jsx';
import './Food.css';

const Food = ({ id, name, image, description, price }) => {
  const { addToCart, cartItems } = useContext(Storecontext);
  const [itemcount, setitemcount] = useState(0);

  const handleAddClick = () => {
    setitemcount((prev) => prev + 1);
    addToCart(id);
  };

  const handleAddMore = () => {
    setitemcount((prev) => prev + 1);
    addToCart(id);
  };

  const handleRemove = () => {
    if (itemcount > 0) {
      setitemcount((prev) => prev - 1);
    }
  };
  

  return (
    <div className="food-item" data-id={id}>
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt={name} />
        {itemcount === 0 ? (
          <img
            className="add"
            onClick={handleAddClick}
            src={assets.add_icon_white}
            alt="add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={handleRemove}
              src={assets.remove_icon_red}
              alt="remove"
            />
            <p>{itemcount}</p>
            <img
              onClick={handleAddMore}
              src={assets.add_icon_green}
              alt="add more"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
        <div className="food-item-price-cart"></div>
      </div>
    </div>
  );
};

export default Food;