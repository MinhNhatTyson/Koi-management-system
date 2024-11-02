import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - Logo and Address */}
        <div className="footer-section">
          <h2>Koi System</h2>
          <p>Placeholder address,<br />Vietnam</p>
        </div>

        {/* Middle Section - Links */}
        <div className="footer-section">
          <h4>Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Middle Section - Help */}
        <div className="footer-section">
          <h4>Help</h4>
          <ul>
            <li><a href="/">Payment Options</a></li>
            <li><a href="/">Returns</a></li>
            <li><a href="/">Privacy Policies</a></li>
          </ul>
        </div>

        {/* Right Section - Newsletter */}
        <div className="footer-section">
          <h4>Newsletter</h4>
          <div className="newsletter">
            <input type="email" placeholder="Enter Your Email Address" />
            <button>SUBSCRIBE</button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>2023 Koi System. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
