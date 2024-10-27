import React, { useState } from 'react';
import './ProductDetailForm.css';

const ProductDetailForm = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className="product-detail">
      <div className="image-gallery">
        <div className="thumbnail-list">
          <div className="thumbnail"></div>
          <div className="thumbnail"></div>
          <div className="thumbnail"></div>
          <div className="thumbnail"></div>
        </div>
        <div className="main-image"></div>
      </div>

      <div className="product-info">
        <div className="template-selection">
          <span>Choose a Template: </span>
          <button className="template-button selected">Christmas</button>
          <button className="template-button">Birthday</button>
          <button className="template-button">New Year</button>
        </div>

        <h2 className="product-title">Christmas Gift</h2>

        <div className="options">
          <div className="option-group">
            <span>Size</span>
            <div className="option-buttons">
              <button className="option-button selected">L</button>
              <button className="option-button">XL</button>
              <button className="option-button">XS</button>
            </div>
          </div>
          <div className="option-group">
            <span>Material</span>
            <div className="option-buttons">
              <button className="option-button selected">Paper</button>
              <button className="option-button">Fabric</button>
              <button className="option-button">Plastic</button>
            </div>
          </div>
          <div className="option-group">
            <span>Color</span>
            <div className="option-buttons">
              <button className="color-button dark-brown"></button>
              <button className="color-button black"></button>
              <button className="color-button brown "></button>
              <button className="color-button white"></button>
            </div>
          </div>
          <div className="option-group">
            <span>Decoration</span>
            <div className="option-buttons">
              <button className="decoration-button selected"></button>
              <button className="decoration-button"></button>
              <button className="decoration-button"></button>
              <button className="decoration-button"></button>
              <button className="decoration-button"></button>
              <button className="decoration-button"></button>
            </div>
          </div>
        </div>

        <div className="quantity-actions-container">
          <div className="quantity-selector">
            <button onClick={decreaseQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>

          <div className="actions">
            <button className="add-to-cart">Add to Cart</button>
            <button className="compare">+ Compare</button>
          </div>
        </div>

        {/* Moved price-info below quantity-actions-container */}
        <div className="price-info">
            <span className="price">$10</span>
            <span className="unit-price">$10 per unit</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailForm;
