import React from 'react';
import './Header.css';
import { FaUser, FaHeart, FaShoppingCart } from 'react-icons/fa'; // Font Awesome Icons

const Header = () => {
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <h1>Gift4U</h1>
      </div>

      {/* Navigation Links */}
      <nav className="nav">
        <ul className="nav-list">
          <li><a href="/" className="active">Home</a></li>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      {/* Icons */}
      <div className="icons">
        <FaUser className="icon" />
        <FaHeart className="icon" />
        <FaShoppingCart className="icon" />
      </div>
    </header>
  );
};

export default Header;
