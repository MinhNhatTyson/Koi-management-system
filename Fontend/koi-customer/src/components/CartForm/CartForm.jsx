import React, { useState } from 'react';
import './CartForm.css';
import characterImage from '../../assets/image/character.png';
const CartForm = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Christmas Gift', price: 10, quantity: 1, image: characterImage },
        { id: 2, name: 'Birthday Gift', price: 10, quantity: 2, image: characterImage }
    ]);

    const handleQuantityChange = (id, newQuantity) => {
        setCartItems(
            cartItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="cart-container">
            <table className="cart-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                        <tr key={item.id}>
                            <td>
                                <img src={item.image} alt={item.name} className="product-image" />
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>{item.price}$</td>
                            <td>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={e => handleQuantityChange(item.id, parseInt(e.target.value))}
                                />
                            </td>
                            <td>{item.price * item.quantity}$</td>
                            <td>
                                <button onClick={() => handleRemoveItem(item.id)} className="remove-button">
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="cart-totals">
                <h2>Cart Totals</h2>
                {cartItems.map(item => (
                    <div key={item.id}>
                        <span>{item.name}</span>
                        <span>{item.price * item.quantity}$</span>
                    </div>
                ))}
                <div className="total-row"> 
                    <h3>Total:</h3>
                    <h3>{calculateTotal()}$</h3>
                </div>
                <button className="checkout-button">Check Out</button>
            </div>
        </div>
    );
};

export default CartForm;
