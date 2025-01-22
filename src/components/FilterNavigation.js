import React, { useState, useEffect } from 'react';
import './FilterNavigation.css';

const FilterNavigation = ({ onSearch }) => {
  const [category, setCategory] = useState('All');
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [priceRange, setPriceRange] = useState('All');

  useEffect(() => {
    onSearch(category, isOpenNow, priceRange);
  }, [category, isOpenNow, priceRange, onSearch]); // Pastikan onSearch sudah dibungkus useCallback di Main.js

  const handleClearAll = () => {
    setCategory('All');
    setIsOpenNow(false);
    setPriceRange('All');
  };

  const isFilterActive = category !== 'All' || isOpenNow || priceRange !== 'All';

  return (
    <div className="filter-navigation">
      <div className="filters-container">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isOpenNow}
            onChange={() => setIsOpenNow(!isOpenNow)}
            className="checkbox-input"
          />
          Open Now
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Cuisines</option>
          <option value="Italian">Italian</option>
          <option value="Chinese">Chinese</option>
          <option value="French">French</option>
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Prices</option>
          <option value="50$">50-100$</option>
          <option value="100$">100-250$</option>
          <option value="250$">250-500$</option>
        </select>
      </div>

      <div className="filter-actions">
        <button
          onClick={handleClearAll}
          className={`clear-btn ${isFilterActive ? 'active' : ''}`}
          disabled={!isFilterActive}
        >
          CLEAR ALL
        </button>
      </div>
    </div>
  );
};

export default FilterNavigation;
