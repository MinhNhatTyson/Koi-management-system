import React, { useState } from 'react';
import './ProductForm.css';
import { FaMoneyBill } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
function ProductForm() {
  const products = [
    { title: 'GENSHIN IMPACT', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv62txaKvM5xBFvr1ztTOpEibjLrabkGFxsw&s', available: 2321, sold: 44514 },
    { title: 'HONKAI STAR RAIL', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7i7lhMJVsruiB_OBxPeVikrii8O5f53ZDfw&s', available: 762, sold: 11780 },
    { title: 'WUTHERING WAVES', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUCg4cuUTtE5zSJYkih85RltoDu3XSuwEP2Q&s', available: 182, sold: 2558 },
    { title: 'GENSHIN IMPACT', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv62txaKvM5xBFvr1ztTOpEibjLrabkGFxsw&s', available: 2321, sold: 44514 },
    { title: 'HONKAI STAR RAIL', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7i7lhMJVsruiB_OBxPeVikrii8O5f53ZDfw&s', available: 762, sold: 11780 },
    { title: 'WUTHERING WAVES', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUCg4cuUTtE5zSJYkih85RltoDu3XSuwEP2Q&s', available: 182, sold: 2558 },
    { title: 'GENSHIN IMPACT', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv62txaKvM5xBFvr1ztTOpEibjLrabkGFxsw&s', available: 2321, sold: 44514 },
    { title: 'HONKAI STAR RAIL', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7i7lhMJVsruiB_OBxPeVikrii8O5f53ZDfw&s', available: 762, sold: 11780 },
    { title: 'WUTHERING WAVES', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUCg4cuUTtE5zSJYkih85RltoDu3XSuwEP2Q&s', available: 182, sold: 2558 },
  ];

  const itemsPerPage = 8; // Limit to 8 products per page
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Calculate the items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

  // Function to change the page
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const navigate = useNavigate();
  return (
    <div className="product-list">
      <h1>Koi Fish List</h1>
      <div className="product-cards" onClick={() => navigate('/product-detail')}>
        {currentItems.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.image} alt={product.title} className="product-image" />
            <h2>{product.title}</h2>
            <div className="product-info">
              <span><FaShoppingCart className="icon" /> Quantity: {product.available}</span>
              <span><FaMoneyBill className="icon" /> Price: {product.sold}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        <button 
          onClick={() => goToPage(currentPage - 1)} 
          disabled={currentPage === 1}
        >
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
        <button 
          onClick={() => goToPage(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductForm;
