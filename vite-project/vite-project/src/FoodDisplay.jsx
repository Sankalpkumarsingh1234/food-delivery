import React, { useContext } from 'react';
import './FoodDisplay.css';
import { Storecontext } from './Storecontext.jsx';
import Food from './Food.jsx';

export default function FoodDisplay() {
    const { food_list } = useContext(Storecontext);

    return (
        <div className="food-display" id="food-display">
            <h2>top dishes near me</h2>
            <div className="food-display-items">
                {Array.isArray(food_list) && food_list.map((item) => (
                    <Food
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        image={item.image}
                        description={item.description}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
}