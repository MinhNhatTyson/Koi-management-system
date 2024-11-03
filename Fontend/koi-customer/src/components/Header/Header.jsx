import React from 'react';
import './Header.css';
import { FaUser, FaHistory , FaShoppingCart } from 'react-icons/fa'; // Font Awesome Icons
import { NavLink, useNavigate } from 'react-router-dom'; // Import NavLink

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <h1>Koi System</h1>
      </div>
      {/* Navigation Links */}
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={({ isActive }) => (isActive ? 'active' : '')}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={({ isActive }) => (isActive ? 'active' : '')}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Icons */}
      <div className="icons">
        <FaUser className="icon" />
        <FaShoppingCart className="icon" />
        <FaHistory className="icon"/>
        <button className="auth-button" onClick={() => navigate('/login')}>
          Login
        </button>
        <button className="auth-button" onClick={() => navigate('/register')}>
          Register
        </button>
      </div>
    </header>
  );
};

export default Header;
