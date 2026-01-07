import React, { useContext, useState } from 'react';
import { assets } from './assets/assets.js';
import './Loginpopup.css';
import { Storecontext } from './Storecontext.jsx';
import axios from 'axios';

export default function Loginpopup({ setShowLogin }) {
    const { url, setToken } = useContext(Storecontext);
    const [currState, setCurrState] = useState('signup');
    const [data, setData] = useState({ name: '', email: '', password: '' });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const [errorMessage, setErrorMessage] = useState('');

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            const endpoint = currState === 'login' ? '/api/user/login' : '/api/user/register';
            const response = await axios.post(`${url}${endpoint}`, data);
            if (response?.data?.token) {
                if (typeof setToken === 'function') setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                setShowLogin(false);
            } else {
                const msg = response?.data?.message || 'login/signup failed';
                setErrorMessage(msg);
            }
        } catch (err) {
            console.error('Auth request error:', err?.response || err.message || err);
            const serverMsg = err?.response?.data?.message;
            if (serverMsg) setErrorMessage(serverMsg);
            else if (err?.request) setErrorMessage('No response from server');
            else setErrorMessage('Request failed');
        }
    };

    return (
        <div className="login-popup">
            <form className="login-popup-container" onSubmit={onLoginSubmit}>
                <div className="login-popup-title">
                    <h2>{currState === 'signup' ? 'Sign up' : 'Login'}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
                </div>
                <div className="login-popup-inputs">
                    {currState === 'login' ? null : (
                        <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="enter your name" />
                    )}

                    <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="enter your email" />
                    <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="enter your password" />
                </div>
                <button type="submit">{currState === 'signup' ? 'Create account' : 'Login'}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" id="agree" />
                    <label htmlFor="agree">I agree to the terms &amp; conditions</label>
                </div>
                {errorMessage && (
                    <div className="login-popup-error" role="alert" style={{ color: 'crimson', marginTop: 8 }}>
                        {errorMessage}
                    </div>
                )}
                {currState === 'signup' ? (
                    <p onClick={() => setCurrState('login')}>already have an account <span>click here</span></p>
                ) : (
                    <p onClick={() => setCurrState('signup')}>create a new account <span>click here</span></p>
                )}
            </form>
        </div>
    );
}