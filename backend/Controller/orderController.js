import OrderModel from '../config/Order.js';

export const createOrder = async (req, res) => {
  try {
    const { email, firstName, lastName, address, city, zip, phone, items, totalAmount, stripeSessionId } = req.body;

    if (!email || !firstName || !address || !totalAmount) {
      return res.status(400).json({ message: 'Missing required order fields' });
    }

    const order = new OrderModel({
      email,
      firstName,
      lastName,
      address,
      city,
      zip,
      phone,
      items,
      totalAmount,
      stripeSessionId,
      status: 'pending',
      paymentStatus: 'completed',
    });

    const savedOrder = await order.save();
    console.log('Order created:', savedOrder._id);
    res.status(201).json({ message: 'Order created successfully', order: savedOrder });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ message: err.message || 'Order creation failed' });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Fetch orders error:', err);
    res.status(500).json({ message: err.message || 'Failed to fetch orders' });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error('Fetch order error:', err);
    res.status(500).json({ message: err.message || 'Failed to fetch order' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await OrderModel.findByIdAndUpdate(id, { status, updatedAt: Date.now() }, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order status updated', order });
  } catch (err) {
    console.error('Update order error:', err);
    res.status(500).json({ message: err.message || 'Failed to update order' });
  }
};
