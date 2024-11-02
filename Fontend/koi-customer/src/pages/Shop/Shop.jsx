import React from 'react';
import ProductForm from '../../components/ProductForm/ProductForm';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import './Shop.css';
const Shop = () => {
  return <div className="main-layout">
    <FilterPanel/>
    <ProductForm/>
  </div>;
};

export default Shop;