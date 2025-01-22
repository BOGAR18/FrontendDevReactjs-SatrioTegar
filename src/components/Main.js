import React, { useState, useEffect, useCallback } from 'react';
import RestaurantItem from './RestaurantItem';
import FilterNavigation from './FilterNavigation';
import './Main.css';

const Main = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8); // Menampilkan 8 restoran awal

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('https://678fae5049875e5a1a92eb9c.mockapi.io/RestoranData');
        const data = await response.json();
        console.log(data);  // Check the ids of your restaurants here
        setRestaurants(data);
        setFilteredRestaurants(data); 
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };
  
    fetchRestaurants();
  }, []);
  

  const handleFilter = useCallback((category, isOpenNow, priceRange) => {
    let filtered = [...restaurants];

    if (category !== 'All') {
      filtered = filtered.filter((restaurant) => restaurant.categories.includes(category));
    }

    if (isOpenNow) {
      filtered = filtered.filter((restaurant) => restaurant.status === 'Open');
    }

    if (priceRange !== 'All') {
      filtered = filtered.filter((restaurant) => restaurant.price_range === priceRange);
    }

    setFilteredRestaurants(filtered);
    setVisibleCount(8); // Reset visible count setelah menerapkan filter
  }, [restaurants]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4); // Menambahkan 4 restoran setiap kali tombol ditekan
  };

  return (
    <div className="restaurant-container">
      <h1>Restaurants</h1>
      <p>Find the best restaurants near you with amazing cuisines and great prices.</p>

      {/* Komponen navigasi filter */}
      <FilterNavigation onSearch={handleFilter} />

      {/* Daftar restoran */}
     <div className="restaurant-list">
  {filteredRestaurants.length > 0 ? (
    filteredRestaurants.slice(0, visibleCount).map((restaurant) => (
      // Pastikan restaurant.id adalah nilai yang unik
      <RestaurantItem key={restaurant.id || `${restaurant.name}-${restaurant.index}`} restaurant={restaurant} />
    ))
  ) : (
    <p>No results found.</p>
  )}
</div>


      {/* Tombol Load More */}
      {filteredRestaurants.length > visibleCount && (
        <button className="load-more" onClick={handleLoadMore}>
          LOAD MORE
        </button>
      )}
    </div>
  );
};

export default Main;
