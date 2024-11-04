import React from 'react';
import './HistoryOrderForm.css';
import { FaCheckCircle } from "react-icons/fa";
function HistoryOrderForm() {
  return (
    <div className="order-summary">
      <div className="order-content">
        <div className="order-details">
          <p><strong>Order ID</strong><br />#46199271460087</p>
          <p><strong>Date</strong><br />14 January, 2022</p>
          <p><strong>Total Amount</strong><br />$299</p>
          <p><strong>Staus</strong><br /><span className="check-icon"><FaCheckCircle /> Delivered</span></p>  
        </div>
        
        <div className="order-right">
          <div className="order-items">
            <div className="item">
              <img src="https://images.pexels.com/photos/11630634/pexels-photo-11630634.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="Apple Watch Series 7" className="item-image" />
              <div className="item-info">
                <h3>Apple Watch Series 7</h3>
                <p>Golden</p>
                <p className="price">$359</p>
                <div className="product-links">
                  <a href="#view-product">View Product</a>
                </div>
              </div>
            </div>
            <div className="item">
              <img src="https://images.pexels.com/photos/11630634/pexels-photo-11630634.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="Beylob 90 Speaker" className="item-image" />
              <div className="item-info">
                <h3>Beylob 90 Speaker</h3>
                <p>Space Gray</p>
                <p className="price">$49</p>
                <div className="product-links">
                  <a href="#view-product">View Product</a> 
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-buttons">
            <button>View Invoice</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryOrderForm;
