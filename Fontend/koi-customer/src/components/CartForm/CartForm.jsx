import React, { useState, useEffect } from 'react';
import './CartForm.css';
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function CartForm() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    // Hàm để lấy dữ liệu giỏ hàng từ API
    const fetchCartItems = async () => {
        const token = localStorage.getItem('authToken'); // Lấy token JWT từ localStorage
        if (!token) {
            alert('User is not authenticated');
            return;
        }

        const userId = getUserIdFromToken(token);  // Lấy userId từ JWT

        try {
            const response = await fetch(`https://localhost:7177/Cart/get-cart?userId=${userId}`, {  // Cập nhật URL với userId từ token
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Gửi token JWT trong header
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCartItems(data); // Cập nhật giỏ hàng
            } else {
                console.error("Failed to fetch cart items.");
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    // Gọi API khi component được render
    useEffect(() => {
        fetchCartItems();
    }, []);

    // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
    const handleQuantityChange = async (cartId, change) => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('User is not authenticated');
            return;
        }

        // Cập nhật số lượng trong UI ngay lập tức
        const updatedItems = cartItems.map(item =>
            item.cartId === cartId
                ? { ...item, quantity: Math.max(1, item.quantity + change) } // Đảm bảo số lượng không nhỏ hơn 1
                : item
        );

        // Cập nhật lại state giỏ hàng
        setCartItems(updatedItems);

        try {
            // Lấy số lượng của item sau khi cập nhật
            const updatedItem = updatedItems.find(item => item.cartId === cartId);

            // Gửi yêu cầu cập nhật số lượng lên server
            const response = await fetch(`https://localhost:7177/Cart/updatequantity?cartId=${cartId}&quantity=${updatedItem.quantity}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Nếu cập nhật thành công
                console.log("Quantity updated successfully.");
            } else {
                console.error("Failed to update cart quantity");
                alert('Failed to update quantity.');
            }
        } catch (error) {
            console.error("Error updating cart quantity:", error);
            alert('Error updating quantity.');
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal;

    const handleContinueOrder = () => {
        setShowCheckout(true); // Hiển thị form nhập địa chỉ và số điện thoại
    };

    const handleCheckout = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('User is not authenticated');
            return;
        }

        const userId = getUserIdFromToken(token); // Lấy userId từ token

        // Kiểm tra thông tin nhập vào
        if (!address || !phone) {
            alert('Please provide both address and phone number');
            return;
        }

        const requestData = {
            address: address,
            phone: phone
        };

        try {
            const response = await fetch(`https://localhost:7177/Order/create-order?userID=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                const data = await response.json();
                alert('Order created successfully!');
                navigate('/invoice', {
                    state: {
                        order: data,  // Truyền dữ liệu của đơn hàng vào state
                        userId: userId,
                        orderItems: data.orderItems
                    }
                });
            } else {
                console.error("Failed to create order.");
                alert('Failed to create order.');
            }
        } catch (error) {
            console.error("Error creating order:", error);
            alert('Error creating order.');
        }
    };

    const getUserIdFromToken = (token) => {
        try {
            const decoded = JSON.parse(atob(token.split('.')[1])); // Giải mã JWT
            return decoded.userId; // Giả sử `userId` có trong payload
        } catch (error) {
            console.error("Error decoding JWT:", error);
            return null;
        }
    };

    const handleRemoveItem = async (cartId) => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('User is not authenticated');
            return;
        }

        try {
            // Gửi yêu cầu xóa sản phẩm khỏi giỏ hàng
            const response = await fetch(`https://localhost:7177/Cart/remove-cartID?cartId=${cartId}`, {
                method: 'DELETE', // Dùng phương thức DELETE cho hành động xóa
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Nếu xóa thành công, loại bỏ sản phẩm khỏi giỏ hàng trong UI
                setCartItems(prevItems => prevItems.filter(item => item.cartId !== cartId));
                console.log("Item removed successfully.");
            } else {
                console.error("Failed to remove item from cart");
                alert('Failed to remove item.');
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
            alert('Error removing item.');
        }
    };

    return (
        <div className="cart-container">
            <div className="cart-items">
                <h2>Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.image} alt={item.productName} />
                            <div className="cart-item-info">
                                <div className="cart-item-title">{item.productName}</div>
                            </div>
                            <div className="cart-item-quantity">
                                <button onClick={() => handleQuantityChange(item.cartId, -1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item.cartId, 1)}>+</button>
                            </div>
                            <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                            <div className="cart-item-remove">
                                <FaTrashAlt onClick={() => handleRemoveItem(item.cartId)} />
                            </div>
                        </div>
                    ))
                )}
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
                            <input
                                type="text"
                                placeholder="Address"
                                className="input-field"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Phone"
                                className="input-field"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <button onClick={handleCheckout} className="checkout-button">Checkout</button>
                        </div>
                    )}
                    <button onClick={() => navigate('/shop')} className="continue-button">Continue Shopping</button>
                </div>
            </div>
        </div>
    );
}

export default CartForm;
