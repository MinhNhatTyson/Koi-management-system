// CartForm.jsx
import React, { useState } from 'react';
import './CartForm.css';
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
function CartForm() {
    const navigate = useNavigate();
    const initialCartItems = [
        { id: 1, title: "Apple Watch Series 7 – 44mm", subtitle: "Golden", price: 259.00, quantity: 1, image: "https://images.pexels.com/photos/13643489/pexels-photo-13643489.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
        { id: 2, title: "Beylob 90 Speaker", subtitle: "Space Gray", price: 99.0, quantity: 1, image: "https://images.pexels.com/photos/13643489/pexels-photo-13643489.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
        { id: 3, title: "Beoplay M5 Bluetooth Speaker", subtitle: "Silver Collection", price: 129.00, quantity: 1, image: "https://images.pexels.com/photos/13643489/pexels-photo-13643489.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
        { id: 4, title: "Apple Watch Series 7 – 44mm", subtitle: "Golden", price: 379.00, quantity: 1, image: "https://images.pexels.com/photos/13643489/pexels-photo-13643489.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" }
    ];

    const [cartItems, setCartItems] = useState(initialCartItems);
    const [showCheckout, setShowCheckout] = useState(false);
    const handleQuantityChange = (id, change) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal;
    const handleContinueOrder = () => {
        setShowCheckout(prevShowCheckout => !prevShowCheckout);
    };
    
    return (
        <div className="cart-container">
            <div className="cart-items">
                <h2>Your Cart</h2>
                {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.title} />
                        <div className="cart-item-info">
                            <div className="cart-item-title">{item.title}</div>
                            <div className="cart-item-subtitle">{item.subtitle}</div>
                        </div>
                        <div className="cart-item-quantity">
                            <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                        </div>
                        <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                        <div className="cart-item-remove"><FaTrashAlt /></div>
                    </div>
                ))}
            </div>

            <div className="summary-container">
                <div className="summary-item">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-total">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <div className="summary-buttons">
                    <button className="confirm-button" onClick={handleContinueOrder}>Continue Order</button>
                    {showCheckout && (
                        <div className="checkout-form">
                            <h3>Checkout Details</h3>
                            <input type="text" placeholder="Address" className="input-field" />
                            <input type="text" placeholder="Phone" className="input-field" />
                            <button  onClick={() => navigate('/invoice')} className="checkout-button">Checkout</button>
                        </div>
                    )}
                    <button onClick={() => navigate('/shop')} className="continue-button">Continue Shopping</button>
                </div>
            </div>
        </div>
    );
}

export default CartForm;
