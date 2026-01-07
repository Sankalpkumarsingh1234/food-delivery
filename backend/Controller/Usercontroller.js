import UserModel from '../config/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { JWT_SECRET } from '../config/env.js';

const createToken = (id) => {
    if (!JWT_SECRET) {
        // Fail fast so tokens aren't issued with an insecure default secret
        throw new Error('JWT_SECRET is not configured. Set JWT_SECRET in your environment.');
    }
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
};

const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'email and password required' });
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).json({ message: 'user not found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'invalid credentials' });
        const token = createToken(user._id);
        res.json({ message: 'login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'server error' });
    }
};

const registeruser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'all fields missing' });
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return res.status(409).json({ message: 'user already exists' });
        if (!validator.isEmail(email)) return res.status(400).json({ message: 'invalid email' });
        if (password.length < 6) return res.status(400).json({ message: 'password too short' });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();
        const token = createToken(savedUser._id);
        res.status(201).json({ message: 'user registered successfully', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'server error' });
    }
};

export { loginuser, registeruser };