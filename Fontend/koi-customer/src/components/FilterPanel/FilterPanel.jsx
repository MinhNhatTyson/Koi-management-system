import React from 'react';
import './FilterPanel.css';
import { FaSearch } from "react-icons/fa";
function FilterPanel() {
  return (
    <div className="filter-panel">
      <h2>Search by</h2>
      <div className="filter-group">
        <label>Find By Name</label>
        <input type="text" placeholder="Search Name" />
      </div>
      <div className="filter-group">
        <label>Find By Description</label>
        <input type="text" placeholder="Search Description" />
      </div>
      <div className="filter-group">
        <label>Find Price Range</label>
        <select>
          <option>All Price</option>
          <option>1.000.000</option>
          <option>2.000.000</option>
          <option>5.000.000</option>
          <option>10.000.000</option>
          <option>20.000.000</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Sort By Price</label>
        <select>
          <option>Default</option>
          <option>From Low to High</option>
          <option>From High to Low</option>
        </select>
      </div>
      <button className="search-button">
        <FaSearch className='icon'/>
        Search
        </button>
    </div>
  );
}

export default FilterPanel;
