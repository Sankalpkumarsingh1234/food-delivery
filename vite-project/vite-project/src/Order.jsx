import React from 'react';
import './Order.css';

export default function Order() {
  return (
    <div className="order">
      <div className="order-container">
        <h1>Your Order</h1>
        <div className="order-content">
          <div className="order-status">
            <p className="status-text">Order Status: Processing</p>
            <div className="order-details">
              <p><strong>Order ID:</strong> #12345</p>
              <p><strong>Estimated Delivery:</strong> 30-45 minutes</p>
              <p><strong>Total Amount:</strong> $0.00</p>
            </div>
          </div>
          <div className="order-tracking">
            <h2>Track Your Order</h2>
            <div className="tracking-steps">
              <div className="step active">
                <div className="step-circle">✓</div>
                <p>Order Confirmed</p>
              </div>
              <div className="step">
                <div className="step-circle">2</div>
                <p>Preparing</p>
              </div>
              <div className="step">
                <div className="step-circle">3</div>
                <p>On the Way</p>
              </div>
              <div className="step">
                <div className="step-circle">4</div>
                <p>Delivered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}