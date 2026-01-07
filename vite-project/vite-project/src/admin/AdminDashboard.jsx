import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const url = 'http://localhost:4000';

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/orders/all`);
      setOrders(response.data || []);
      console.log('Orders fetched:', response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      alert('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`${url}/api/orders/${orderId}`, { status: newStatus });
      console.log('Order updated:', response.data);
      fetchOrders();
      setSelectedOrder(null);
      alert('Order status updated successfully');
    } catch (err) {
      console.error('Error updating order:', err);
      alert('Failed to update order status');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard - Orders Management</h1>
      
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="orders-container">
          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Payment Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id.substring(0, 8)}...</td>
                    <td>{order.firstName} {order.lastName || ''}</td>
                    <td>{order.email}</td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td>
                      <span className={`status ${order.status}`}>{order.status}</span>
                    </td>
                    <td>
                      <span className={`payment-status ${order.paymentStatus}`}>{order.paymentStatus}</span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button 
                        className="view-btn"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Order Details</h2>
            <div className="order-details">
              <p><strong>Order ID:</strong> {selectedOrder._id}</p>
              <p><strong>Customer:</strong> {selectedOrder.firstName} {selectedOrder.lastName || ''}</p>
              <p><strong>Email:</strong> {selectedOrder.email}</p>
              <p><strong>Phone:</strong> {selectedOrder.phone || 'N/A'}</p>
              <p><strong>Address:</strong> {selectedOrder.address}, {selectedOrder.city || ''} {selectedOrder.zip || ''}</p>
              <p><strong>Total Amount:</strong> ${selectedOrder.totalAmount.toFixed(2)}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
              <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>

              <h3>Items Ordered:</h3>
              <ul className="items-list">
                {selectedOrder.items && selectedOrder.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - Qty: {item.quantity} x ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>

              <h3>Update Status:</h3>
              <div className="status-buttons">
                {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => (
                  <button
                    key={status}
                    className={`status-btn ${selectedOrder.status === status ? 'active' : ''}`}
                    onClick={() => updateOrderStatus(selectedOrder._id, status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>

              <button className="close-btn" onClick={() => setSelectedOrder(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
