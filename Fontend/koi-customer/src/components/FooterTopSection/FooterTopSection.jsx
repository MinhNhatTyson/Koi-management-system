import React from 'react';
import './FooterTopSection.css'; // Import the CSS file
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS

const FooterTopSection = () => {
  return (
    <div className="footer-top-section">
      <div className="feature-item">
        <i className="fa fa-trophy feature-icon"></i>
        <div className="feature-text">
          <h4>High Quality</h4>
          <p>crafted from top materials</p>
        </div>
      </div>

      <div className="feature-item">
        <i className="fa fa-shield feature-icon"></i>
        <div className="feature-text">
          <h4>Warranty Protection</h4>
          <p>Over 2 years</p>
        </div>
      </div>

      <div className="feature-item">
        <i className="fa fa-truck feature-icon"></i>
        <div className="feature-text">
          <h4>Free Shipping</h4>
          <p>Order over 150 $</p>
        </div>
      </div>

      <div className="feature-item">
        <i className="fa fa-headset feature-icon"></i>
        <div className="feature-text">
          <h4>24 / 7 Support</h4>
          <p>Dedicated support</p>
        </div>
      </div>
    </div>
  );
};

export default FooterTopSection;