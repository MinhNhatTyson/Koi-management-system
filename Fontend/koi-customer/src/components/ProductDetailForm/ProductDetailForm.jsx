import React, { useState, useEffect } from 'react';
import './ProductDetailForm.css';
import { FaShoppingCart } from "react-icons/fa";
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Dùng named import

const ProductDetailForm = () => {
    const { productId } = useParams(); // Lấy productId từ URL
    const [product, setProduct] = useState(null); // state để lưu sản phẩm
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    // Lấy thông tin sản phẩm từ API
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await fetch(`https://localhost:7177/Product/get-all-productby-id/${productId}`);
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data); // Cập nhật state với dữ liệu sản phẩm
                } else {
                    // Log lỗi khi không có phản hồi hợp lệ từ API
                    console.error("Failed to fetch product details. Status:", response.status);
                }
            } catch (error) {
                // Log bất kỳ lỗi nào khi không thể kết nối tới API
                console.error("Error fetching product details:", error);
            }
        };

        if (productId) {
            fetchProductDetail(); // Gọi API khi có productId
        }
    }, [productId]);

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleAddToCart = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('User is not authenticated');
            return;
        }

        // Giải mã token JWT để lấy thông tin người dùng
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId.toString(); 

        try {
            const response = await fetch(`https://localhost:7177/Cart/add-to-cart?userId=${userId}&ProductID=${product.productId}&Quantity=${quantity}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Product added to cart!');
                navigate('/cart');
            } else {
                console.error('Failed to add to cart.');
                alert('Failed to add product to cart.');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Error adding product to cart.');
        }
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="product-detail-form">
            <div className="product-image-detail">
                <img src={product.image} alt={product.productName} />
            </div>
            <div className="product-info">
                <h1 className="product-title">{product.productName}</h1>
                <div className="product-price-quantity">
                    <p className="product-price">{product.price} VND</p>
                </div>
                <div className="product-quantity">
                    <label>Quantity</label>
                    <div className="quantity-input">
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                            max={product.stockQuantity}
                        />
                        <button className="add-to-cart-btn" onClick={handleAddToCart}><FaShoppingCart /> Add to cart</button>
                    </div>
                </div>
                <div className="product-description">
                    <h2>Description</h2>
                    <p>{product.productDescription}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailForm;
