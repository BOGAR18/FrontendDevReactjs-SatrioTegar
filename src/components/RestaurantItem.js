import React, { useState } from 'react';
import DetailView from './DetailView';
import './RestaurantItem.css';

const RestaurantItem = ({ restaurant }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const image = restaurant.photos?.[0] || 'https://via.placeholder.com/600x400';
  const category = restaurant.categories?.[0] || 'Uncategorized';

  return (
    <div className="restaurant-item">
      <img src={image} alt={restaurant.name} className="restaurant-image" />
      <h3>{restaurant.name}</h3>
      <div className="restaurant-info">
        <div className="restaurant-details">
          <p>⭐ {restaurant.rating} / 5</p>
          <p>{category} - {restaurant.price_range}</p>
        </div>
        <p className={`restaurant-status ${restaurant.status === 'Open' ? 'open' : 'closed'}`}>
          {restaurant.status}
        </p>
      </div>
      <button onClick={toggleModal} className={`learn-more-btn ${isModalOpen ? 'btn-close' : 'btn-open'}`}>
        {isModalOpen ? 'Close Details' : 'Learn More'}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={toggleModal}>
              &times;
            </button>
            <DetailView restaurant={restaurant} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantItem;