import React, { useState } from 'react'; 
import './InvoiceForm.css';
import { useNavigate } from 'react-router-dom';
const InvoiceForm = ({ order, userId, orderItems }) => {
    // State to manage visibility of the Success button
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    // Calculate total quantity and total unit price
    const totalQuantity = orderItems.reduce((acc, item) => acc + item.Quantity, 0);
    const totalUnitPrice = orderItems.reduce((acc, item) => acc + item.Quantity * item.UnitPrice, 0);
    // Handle Payment Center button click
    const handlePaymentButtonClick = () => {
        setIsSuccessVisible((prev) => !prev); // Toggle the visibility
    };
    const navigate = useNavigate();
    return (
        <div className="invoice-form">
            <h1>Invoice</h1>
            <div className="invoice-details">
                <p><strong>Order ID:</strong> {order.OrderId}</p>
                <p><strong>User ID:</strong> {userId}</p>
                <p><strong>Order Date:</strong> {new Date(order.OrderDate).toLocaleDateString()}</p>
                <p><strong>Total Price:</strong> ${order.TotalPrice.toFixed(2)}</p>
                <p><strong>Address:</strong> {order.Address}</p>
                <p><strong>Phone:</strong> {order.Phone}</p>
            </div>
            <h2>Order Items</h2>
            <table className="order-items">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderItems.map((item) => (
                        <tr key={item.ProductId}>
                            <td>{item.ProductId}</td>
                            <td>{item.ProductName}</td>
                            <td>{item.Quantity}</td>
                            <td>${item.UnitPrice.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2"><strong>Total</strong></td>
                        <td><strong>{totalQuantity}</strong></td>
                        <td><strong>${totalUnitPrice.toFixed(2)}</strong></td>
                    </tr>
                </tfoot>
            </table>
            <div className="invoice-buttons">         
                <button className="payment-button"  onClick={handlePaymentButtonClick}>Payment Center</button>
                {isSuccessVisible && (
                    <button onClick={() => navigate('/history')} className="success-button">Success</button>
                )}
            </div>
        </div>
    );
};

export default InvoiceForm;
