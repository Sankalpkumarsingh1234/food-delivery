import express from 'express';
import { createOrder, getAllOrders, getOrderById, updateOrderStatus } from '../Controller/orderController.js';

const router = express.Router();

router.post('/create', createOrder);
router.get('/all', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrderStatus);

export default router;
