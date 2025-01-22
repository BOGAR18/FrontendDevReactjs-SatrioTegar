import React from 'react';
import './DetailView.css';

const DetailView = ({ restaurant }) => {
  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="detail-view">
      <h1>{restaurant.name}</h1>
      <p>Rating: {restaurant.rating} / 5</p>

      <div className="reviews">
        <h2>Reviews</h2>
        {restaurant.reviews && restaurant.reviews.length > 0 ? (
          <div className="reviews-container">
            {restaurant.reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <img src={review.image} alt={review.name} className="review-image" />
                  <h4>{review.name}</h4>
                </div>
                <div className="review-body">
                  <p>Rating: {review.rating}</p>
                  <p>{review.text}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews available.</p>
        )}
      </div>

    </div>
  );
};

export default DetailView;
