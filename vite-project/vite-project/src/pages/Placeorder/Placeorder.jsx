import React, { useContext, useState } from 'react';
import './Placeorder.css';
import { Storecontext } from '../../Storecontext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Placeorder() {
  const { getTotalCartAmount, url, cartItems, food_list } = useContext(Storecontext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveOrder = async (stripeSessionId) => {
    try {
      // Build items array from cart
      const items = [];
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          const foodItem = food_list.find((item) => item._id === itemId);
          if (foodItem) {
            items.push({
              foodId: itemId,
              name: foodItem.name,
              quantity: cartItems[itemId],
              price: foodItem.price,
            });
          }
        }
      }

      const orderData = {
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        address: form.address,
        city: form.city,
        zip: form.zip,
        phone: form.phone,
        items,
        totalAmount: getTotalCartAmount() + 2,
        stripeSessionId,
      };

      const resp = await axios.post(`${url}/api/orders/create`, orderData);
      console.log('Order saved:', resp.data);
      return resp.data.order;
    } catch (err) {
      console.error('Order save error:', err);
      throw err;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (!form.firstName || !form.email || !form.address) {
      alert('Please fill the required fields (first name, email, address).');
      return;
    }

    const cartTotal = getTotalCartAmount();
    if (cartTotal <= 0) {
      alert('Your cart is empty. Please add items before proceeding.');
      return;
    }
   
    (async () => {
      try {
        const total = Math.round((cartTotal + 2) * 100);
        console.log('Initiating payment for amount (cents):', total);
        const resp = await axios.post(`${url}/api/payment/create-checkout-session`, { amount: total });
        console.log('Payment response:', resp.data);
        if (resp?.data?.url) {
          // Save order to DB with the session ID
          await saveOrder(resp.data.id);
          console.log('Redirecting to Stripe checkout:', resp.data.url);
          window.location.href = resp.data.url;
        } else {
          alert(`Payment initialization failed: ${resp?.data?.message || 'No URL returned'}`);
        }
      } catch (err) {
        console.error('Payment error:', err);
        const errorMsg = err?.response?.data?.message || err?.message || 'Unknown error';
        console.error('Detailed error:', errorMsg);
        alert(`Payment request failed: ${errorMsg}`);
      }
    })();
  };

  return (
    <div className="placeorder-page">
      <form onSubmit={handleSubmit} className="place-holder">
        <div className="place-order-left">
          <p className="title">delivery details</p>
          <div className="multi-feilds">
            <input name="firstName" value={form.firstName} onChange={handleChange} type="text" placeholder="First Name" required />
            <input name="lastName" value={form.lastName} onChange={handleChange} type="text" placeholder="Last Name" />
          </div>
          <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email address" required />
          <input name="address" value={form.address} onChange={handleChange} type="text" placeholder="Address" required />
          <div className="multi-feilds">
            <input name="city" value={form.city} onChange={handleChange} type="text" placeholder="City" />
            <input name="zip" value={form.zip} onChange={handleChange} type="text" placeholder="Zip Code" />
            <input name="phone" value={form.phone} onChange={handleChange} type="text" placeholder="Phone Number" />
          </div>
        </div>

        <div className="place-order-right">
          <h2>cart totals</h2>
          <div className="totals-wrap">
            <div className="cart-total-details">
              <p>subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <div className="cart-total-details">
              <p>delivery fee</p>
              <p>$2.00</p>
            </div>
            <div className="cart-total-details total-bold">
              <b>Total</b>
              <b>${(getTotalCartAmount() + 2).toFixed(2)}</b>
            </div>
            <button type="submit" className="checkout-btn">Proceed to payments</button>
          </div>
        </div>
      </form>
    </div>
  );
}
