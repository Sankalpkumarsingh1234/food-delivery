import React, { useContext } from 'react';
import './cart.css';
import { Storecontext } from '../../Storecontext.jsx';
import { useNavigate } from 'react-router-dom';
export default function Cart() {
  const { food_list, cartItems, removeFromcart,getTotalCartAmount } = useContext(Storecontext);
const navigate=useNavigate();
  if (!cartItems || !food_list) {
    return <div className="cart"><p>Loading cart...</p></div>;
  }

  const hasItems = Object.values(cartItems).some(qty => qty > 0);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>items</p>
          <p>title</p>
          <p>price</p>
          <p>quantity</p>
          <p>total</p>
          <p>remove</p>
        </div>
        <hr />
        {hasItems ? (
          food_list.map((item) => {
            if (cartItems[item._id] && cartItems[item._id] > 0) {
              return (
                <div key={item._id} className="cart-items-item">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
                  <p onClick={() => removeFromcart(item._id)} className="cross">✕</p>
                </div>
              );
            }
            return null;
          })
        ) : (
          <p className="empty-cart">Your cart is empty</p>
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>cart totals</h2>
          <div>
          <div className="cart-total-details">
            <p>subtotal</p>
            <p>{getTotalCartAmount()}</p>
          </div>
          <div className="cart-total-details">
            <p>delivery fee</p>
            <p>{2}</p>
          </div>
          <div className="cart-total-details">
            <b>Total</b>
            <b>{getTotalCartAmount()+2}</b>
          </div>
          <button onClick={() => navigate('/order')} className="checkout-btn">proceed to payments</button>
          </div>
          <div className="cart-promo-code">
            <div>
              <p>if u have a promo code enter it</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="promo code" />
                <button>submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}