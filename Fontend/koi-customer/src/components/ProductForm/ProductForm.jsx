import React, { useState, useEffect } from 'react';
import './ProductForm.css';
import { FaMoneyBill, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function ProductForm() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://localhost:7177/Product/get-all-product');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="product-list">
      <h1>Koi Fish List</h1>
      <div className="product-cards">
        {currentItems.map((product) => (
          <div 
            className="product-card" 
            key={product.productId} 
            onClick={() => navigate(`/product-detail/${product.productId}`)}
          >
            <img src={product.image} alt={product.productName} className="product-image" />
            <h2>{product.productName}</h2>
            <div className="product-info">
              <span><FaShoppingCart className="icon" /> Quantity: {product.stockQuantity}</span>
              <span><FaMoneyBill className="icon" /> Price: ${product.price}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductForm;
