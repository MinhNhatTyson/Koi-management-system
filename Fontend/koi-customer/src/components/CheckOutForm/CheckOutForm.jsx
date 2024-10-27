import React, { useState } from 'react';
import './CheckOutForm.css';

const CheckOutForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'Sri Lanka',
    streetAddress: '',
    city: '',
    province: 'Western Province',
    zipCode: '',
    phone: '',
    email: '',
    additionalInfo: '',
    paymentMethod: 'bank'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order placed:', form);
  };

  return (
    <div className="checkout-container">
      <form className="billing-form" onSubmit={handleSubmit}>
        <h2>Billing details</h2>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            className='input-des'
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            className='input-des'
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          name="companyName"
          placeholder="Company Name (Optional)"
          value={form.companyName}
          onChange={handleChange}
        />

        <div className="form-group">
          <label>Country / Region</label>
          <select name="country" value={form.country} onChange={handleChange}>
            <option value="Sri Lanka">Sri Lanka</option>
            {/* Add more country options here */}
          </select>
        </div>

        <input
          type="text"
          name="streetAddress"
          placeholder="Street address"
          value={form.streetAddress}
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="city"
          placeholder="Town / City"
          value={form.city}
          onChange={handleChange}
          required
        />

        <div className="form-group">
          <label>Province</label>
          <select name="province" value={form.province} onChange={handleChange}>
            <option value="Western Province">Western Province</option>
            {/* Add more province options here */}
          </select>
        </div>

        <input
          type="text"
          name="zipCode"
          placeholder="ZIP code"
          value={form.zipCode}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="additionalInfo"
          placeholder="Additional Information"
          value={form.additionalInfo}
          onChange={handleChange}
        />
      </form>

      <div className="order-summary">
        <h2>Product</h2>
        <div className="product-summary">
          <div>Christmas Gift x 1 <span>10$</span></div>
          <div>Christmas Gift x 2 <span>20$</span></div>
          <div>Total: <strong>30$</strong></div>
        </div>

        <div className="payment-method">
          <h3>Payment Method</h3>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="bank"
              checked={form.paymentMethod === 'bank'}
              onChange={handleChange}
            />
            Direct Bank Transfer
          </label>
          <p>Make your payment directly into our bank account. Please use your OrderID as the payment refernce. Your order will not be shipped until the funds have cleared in our account</p>

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={form.paymentMethod === 'cod'}
              onChange={handleChange}
            />
            Cash On Delivery
          </label>
          <p>Your personal data will be used to support your experience throughout this websote, to manage access to your account, and for other purposes described in our privacy policy</p>
        </div>

        <button type="submit" className="place-order-btn">Place order</button>
      </div>
    </div>
  );
};

export default CheckOutForm;
