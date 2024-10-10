import React, { useState } from 'react';
import '../css/LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
    
        const requestBody = {
            email: username,  // Use 'email' field
            passwordHash: password  // Use 'passwordHash' instead of 'password'
        };
    
        console.log('Sending request body:', requestBody);  // Debugging: Check the request structure
    
        try {
            const response = await fetch('https://localhost:7230/Authen/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),  // Send the request body in the correct format
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
            } else {
                const errorData = await response.json();
                console.log('Login failed:', errorData); // Debugging: Inspect error data
                setErrorMessage(errorData.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='login-page'>
            <div className='wrapper'>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    {errorMessage && <p className='error'>{errorMessage}</p>} {/* Display error message if login fails */}
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
                            type="password" 
                            placeholder='Password' 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <FaLock className='icon' />
                    </div>
                    <div className='remember-forgot'>
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href='#'>Forgot password?</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className='register-link'>
                        <p>Don't have an account? <a href='/register'>Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
