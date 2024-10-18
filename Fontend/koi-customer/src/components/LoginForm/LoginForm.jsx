import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Handle form submission logic here
    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
    } else {
      setErrorMessage(''); // Clear error message
      console.log('Email:', email, 'Password:', password);
    }
  };

  return (
    <div className='login-form'>
      {/* Left Section: Image */}
      <div className="left">
        <div className="image"></div>
      </div>

      {/* Right Section: Login Form */}
      <div className="right">
        <h1>Log in to Gift4U</h1>
        <p className="pdes">Enter your details below</p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              id="email" 
              className="input-field" 
              placeholder="Email Or Phone Number" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              id="password" 
              className="input-field" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="login-btn">Log In</button>
            <p className="forgot-password">Forgot Password?</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
