import React from 'react';
import './Contact.css'; // Ensure this file exists with appropriate styles

function Contact() {
  return (
    <div className="contact">
      <div className="container">
        <h1>Contact Us</h1>
        <p>We would love to hear from you. Get in touch today!</p>
        <div className="contact-options">
          <div className="option">
            <i className="fas fa-envelope"></i>
            <h2>Email</h2>
            <p>Please feel free to reach out to us with any questions or inquiries. We are here to help!</p>
            <a href="mailto:contact@gift4u.com">contact@gift4u.com</a>
          </div>
          <div className="option">
            <i className="fas fa-phone-alt"></i>
            <h2>Phone</h2>
            <p>Chat with our team for instant assistance.</p>
            <a href="tel:+1234567890">+1 234 567 890</a> {/* Add a valid phone number */}
          </div>
          <div className="option">
            <i className="fas fa-comments"></i>
            <h2>Messages</h2>
            <p>We are ready at all times to answer your questions about our service.</p>
            <a href="https://facebook.com/gift4u" target="_blank" rel="noopener noreferrer">facebook.com/gift4u</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
