import React, { useState } from 'react';
import './RegisterForm.css';
import { FaGoogle } from 'react-icons/fa'; // Import Google icon from react-icons

function RegisterForm() {
  const [name, setName] = useState('');
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
    <div className='register-form'>
      {/* Left Section: Image */}
      <div className="left">
        <div className="image"></div>
      </div>

      {/* Right Section: Register Form */}
      <div className="right">
        <h1>Create an account</h1>
        <p className="pdes">Enter your details below</p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              id="name" 
              className="input-field" 
              placeholder="Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
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
            <button type="submit" className="register-btn">Create Account</button>
          </div>
        </form>

        {/* Sign Up with Google Button */}
        <button className="google-btn">
          <FaGoogle className="google-icon" />
          Sign Up with Google
        </button>

        {/* Existing User Prompt */}
        <p className="already-have-account">Already have an account?<span className="login-link">Log in</span></p>
      </div>
    </div>
  );
}

export default RegisterForm;
