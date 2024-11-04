import React, { useState } from 'react';
import './ProductDetailForm.css';
import { FaShoppingCart } from "react-icons/fa";
const ProductDetailForm = () => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    return (
        <div className="product-detail-form">
            <div className="product-image-detail">
                <img src="https://images.pexels.com/photos/13157061/pexels-photo-13157061.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="Product" />
            </div>
            <div className="product-info">
                <h1 className="product-title">KASCHMIR PULLOVER PATENT V-NECK - GRAU WOMEN</h1>
                <div className="product-price-quantity">
                    <p className="product-price">270.000 VND</p>
                </div>
                <div className="product-quantity">
                    <label>Quantity</label>
                    <div className="quantity-input">
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                        />
                        <button className="add-to-cart-btn"><FaShoppingCart /> Add to cart</button>
                    </div>
                </div>
                <div className="product-description">
                    <h2>Description</h2>
                    <p>Building a koi pond requires attention to water quality, temperature, and design to keep koi happy and healthy. Explore the basics of pond setup, filtration, and plant integration to create a perfect aquatic environment for your koi.</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailForm;
