import './HistoryOrderForm.css';
import { FaCheckCircle } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Sửa lại cách import

function HistoryOrderForm() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm để lấy dữ liệu đơn hàng từ API
  const fetchOrderData = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('User is not authenticated');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);  // Sử dụng jwtDecode thay vì jwt_decode
      const userId = decodedToken.userId;  // Lấy userId từ token

      const response = await fetch(`https://localhost:7177/Order/get-order?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Gửi JWT token trong header
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrderData(data); // Cập nhật dữ liệu đơn hàng
        setIsLoading(false);
      } else {
        setError('Failed to fetch order data.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
      setError('Error fetching order data.');
      setIsLoading(false);
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    fetchOrderData();
  }, []);

  // Hiển thị trong trường hợp đang tải hoặc có lỗi
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Kiểm tra xem dữ liệu đơn hàng có tồn tại không
  if (!orderData || orderData.length === 0) {
    return <p>No orders found.</p>;
  }

  // Render dữ liệu đơn hàng
  return (
    <div className="order-summary">
      {orderData.map((order) => (
        <div key={order.orderId} className="order-content">
          <div className="order-details">
            <p><strong>Order ID</strong><br />#{order.orderId}</p>
            <p><strong>Date</strong><br />{new Date(order.orderDate).toLocaleDateString()}</p>
            <p><strong>Total Amount</strong><br />${(order.totalPrice / 100).toFixed(2)}</p>
            <p><strong>Status</strong><br /><span className="check-icon"><FaCheckCircle /> Delivered</span></p>
          </div>
          
          <div className="order-right">
            <div className="order-items">
              {order.orderItems.map((item, index) => (
                <div key={index} className="item">
                  <img src={item.image} alt={item.productName} className="item-image" />
                  <div className="item-info">
                    <h3>{item.productName}</h3>
                    {/* Hiển thị price của sản phẩm */}
                    <p className="price">${(item.price / 100).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoryOrderForm;
