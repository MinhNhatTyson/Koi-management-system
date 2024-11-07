import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = {
            email: email,
            passwordHash: password,
        };
    
        try {
            const response = await fetch('https://localhost:7177/Authen/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                const result = await response.json();
                localStorage.setItem('authToken', result.token); // Lưu JWT vào localStorage
                window.location.href = '/'; // Chuyển hướng sau khi đăng nhập thành công
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            alert("Error: Could not connect to the server.");
        }
    };

    return (
        <div className="login-form">
            <div className="form-container">
                <div className="form-image">
                    <img src="https://i.pinimg.com/236x/39/b7/ae/39b7ae683e505d9b905d10b57d044dbf.jpg" alt="Login" />
                </div>
                <div className="form-content">
                    <form onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <div className="form-group">
                            <label htmlFor="login-email">Email</label>
                            <input
                                type="email"
                                id="login-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password">Password</label>
                            <input
                                type="password"
                                id="login-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                        <p>Don't have an account? <a href="#register">Register</a></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
