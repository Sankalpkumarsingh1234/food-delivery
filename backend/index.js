import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import './config/db.js';
import foodRouter from './Routes/FoodRoutes.js';
import userrouter from './Routes/UserRoutes.js';
import paymentRouter from './Routes/PaymentRoutes.js';
import orderRouter from './Routes/OrderRoutes.js';
const app=express();
app.use(cors());
app.use(express.json());
app.use('/api/food',foodRouter);
app.use('/api/user',userrouter);
app.use('/api/payment', paymentRouter);
app.use('/api/orders', orderRouter);
app.use('/uploads',express.static('uploads'));
const port=4000;
app.listen(port,()=>
{
    console.log(`server is running on port ${port}`);
})
