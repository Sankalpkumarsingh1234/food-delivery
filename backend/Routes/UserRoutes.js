import express from 'express';
import { loginuser, registeruser } from '../Controller/Usercontroller.js';

const userrouter = express.Router();

userrouter.post('/login', loginuser);
userrouter.post('/register', registeruser);

export default userrouter;