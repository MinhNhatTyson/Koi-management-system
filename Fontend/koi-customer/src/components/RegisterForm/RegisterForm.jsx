import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        const data = {
            userName: userName, // Sử dụng userName từ state
            passwordHash: password,
            email: email,
        };

        try {
            const response = await fetch('https://localhost:7177/Authen/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Registration successful!"); // Hiển thị thông báo thành công
                setMessage("Registration successful!");
            } else {
                const errorData = await response.json();
                setMessage(`Registration failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            setMessage("Error: Could not connect to the server.");
        }
    };

    return (
        <div className="register-form">
            <div className="form-container">
                <div className="form-image">
                    <img src="https://i.pinimg.com/236x/39/b7/ae/39b7ae683e505d9b905d10b57d044dbf.jpg" alt="Register" />
                </div>
                <div className="form-content">
                    <form onSubmit={handleSubmit}>
                        <h2>Register</h2>
                        <div className="form-group">
                            <label htmlFor="register-username">UserName</label>
                            <input
                                type="text"
                                id="register-username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-email">Email</label>
                            <input
                                type="email"
                                id="register-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-password">Password</label>
                            <input
                                type="password"
                                id="register-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-confirm-password">Confirm Password</label>
                            <input
                                type="password"
                                id="register-confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Register</button>
                        <p>Already have an account? <a href="#login">Login</a></p>
                        {message && <p className="message">{message}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
