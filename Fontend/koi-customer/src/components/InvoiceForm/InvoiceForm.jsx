import React, { useState, useEffect } from 'react';
import './InvoiceForm.css';
import { useNavigate, useLocation } from 'react-router-dom';

const InvoiceForm = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { order, userId, orderItems } = state || {};  // Lấy orderItems từ state

    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);  // Thêm state để quản lý loading

    useEffect(() => {
        // Kiểm tra xem dữ liệu đã có sẵn chưa khi trang được tải
        if (!order || !orderItems) {
            return;
        }
    }, [order, orderItems]);

    const handlePaymentButtonClick = async () => {
        setIsLoading(true);  // Đặt trạng thái loading là true khi bắt đầu thanh toán

        try {
            const response = await fetch('https://localhost:7177/api/VnPay/proceed-vnpay-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order.orderId.toString())  // Gửi trực tiếp orderId dưới dạng chuỗi
            });

            if (response.ok) {
                const result = await response.json();
                if (result.paymentUrl) {
                    console.log("Redirecting to:", result.paymentUrl);

                    // Mở đường link trong tab mới
                    const newWindow = window.open(result.paymentUrl, '_blank');
                    setIsSuccessVisible(true);
                    if (newWindow) {
                        // Đảm bảo nút "Success" sẽ hiển thị khi người dùng quay lại trang thanh toán
                        newWindow.onbeforeunload = () => {
                            // Tạo một thông báo (hoặc kiểm tra thêm) khi người dùng quay lại trang
                            setIsSuccessVisible(true);  // Hiển thị nút success khi quay lại
                        };
                    } else {
                        alert('Unable to open payment page in a new tab.');
                    }
                } else {
                    alert('Payment URL not found');
                }
            } else {
                alert('Payment request failed');
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("Error processing payment.");
        } finally {
            setIsLoading(false);  // Đặt trạng thái loading là false sau khi hoàn thành yêu cầu
        }
    };


    const handleSuccessButtonClick = () => {
        navigate('/history');  // Chuyển hướng tới trang lịch sử sau khi thanh toán thành công
    };

    if (!order || !orderItems) {
        return <div>Loading...</div>;  // Nếu chưa có dữ liệu order hoặc orderItems, hiển thị loading
    }

    return (
        <div className="invoice-form">
            <h1>Invoice</h1>
            <div className="invoice-details">
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>User ID:</strong> {userId}</p>
                <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                <p><strong>Total Price:</strong> ${order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
            </div>
            <h2>Order Items</h2>
            <table className="order-items">
                <thead>
                    <tr>
                        <th>Product Name</th>
                    </tr>
                </thead>
                <tbody>
                    {orderItems.length === 0 ? (
                        <tr>
                            <td colSpan="1">No items in the order.</td>
                        </tr>
                    ) : (
                        orderItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.productName}</td>  {/* Hiển thị tên sản phẩm */}
                            </tr>
                        ))
                    )}
                </tbody>
                <tfoot>
                    {/* Có thể thêm các thông tin khác nếu cần */}
                </tfoot>
            </table>
            <div className="invoice-buttons">
                <button
                    className="payment-button"
                    onClick={handlePaymentButtonClick}
                    disabled={isLoading}  // Vô hiệu hóa nút khi đang trong quá trình thanh toán
                >
                    {isLoading ? 'Processing Payment...' : 'Payment Center'}
                </button>
                {isSuccessVisible && (
                    <button onClick={handleSuccessButtonClick} className="success-button">
                        Success
                    </button>
                )}
            </div>
        </div>
    );
};

export default InvoiceForm;
