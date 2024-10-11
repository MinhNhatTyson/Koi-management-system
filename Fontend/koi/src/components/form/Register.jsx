// src/components/Register.jsx
import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/Register.css';

const Register = () => {
    const navigate = useNavigate(); // Sử dụng hook useNavigate
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        // Thêm logic đăng ký ở đây
        if (password === confirmPassword) {
            console.log('Registering:', { username, password });
            // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
            navigate('/login');
        } else {
            alert("Passwords do not match");
        }
    };

    return (
        <div className='Register-page'>
            <div className='wrapper'>
                <form onSubmit={handleRegister}>
                    <h1>Register</h1>
                    <div className='register-form'>
                        <div className='input-box'>
                            <input
                                type="text"
                                placeholder='Username'
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input
                                type="Email"
                                placeholder='Email'
                                required
                                value={password}
                            // onChange={(e) => setEmail(e.target.value)}
                            />
                            <FaLock className='icon' />
                        </div>
                        <div className='input-box'>
                            <input
                                type="password"
                                placeholder='Password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FaLock className='icon' />
                        </div>
                        <div className='input-box'>
                            <input
                                type="password"
                                placeholder='Confirm Password'
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <FaLock className='icon' />
                        </div>
                        <button type="submit">Register</button>
                        <div className='login-link'>
                            <p>Have an account? <a href='/Login'>Login</a></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
