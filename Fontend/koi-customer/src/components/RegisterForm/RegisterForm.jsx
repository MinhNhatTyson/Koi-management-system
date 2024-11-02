import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      // Handle registration logic here
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
              </form>
          </div>
      </div>
      </div>
  );
};

export default RegisterForm;