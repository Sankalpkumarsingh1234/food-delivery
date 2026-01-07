import { createContext, useState } from "react";
import { food_list } from "./assets/assets.js";

export const Storecontext = createContext(null);

const StorecontextProvider = (props) => {
  // Initialize cartItems as an object where keys are food IDs and values are quantities
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };
const url="http://localhost:4000";
const [token, setToken] = useState(() => {
  try {
    return localStorage.getItem('token') || null;
  } catch (e) {
    return null;
  }
});

const logout = () => {
  setToken(null);
  try {
    localStorage.removeItem('token');
  } catch (e) {}
  setCartItems({});
};
  const removeFromcart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };
  const getTotalCartAmount=()=>
  {
    let totalAmount=0;
    for(const itemId in cartItems)
    {
      const itemQuantity=cartItems[itemId];
      const itemDetails=food_list.find((item)=>item._id===itemId);
      if(itemDetails)
      {
        totalAmount+=itemDetails.price * itemQuantity;
      }
    }
    return totalAmount;
  }

  const contextvalue = {
    food_list,
    cartItems,
    addToCart,
    removeFromcart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    logout,
  };

  return (
    <Storecontext.Provider value={contextvalue}>
      {props.children}
    </Storecontext.Provider>
  );
};

export default StorecontextProvider;