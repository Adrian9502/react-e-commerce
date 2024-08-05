import React from "react";

// Define a constant for the number of stars
const MAX_STARS = 5;

function StarRating({ rating }) {
  // Calculate the number of filled and empty stars
  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = MAX_STARS - filledStars - halfStar;

  return (
    <div className="flex items-center">
      {[...Array(filledStars)].map((_, i) => (
        <svg
          key={`filled-${i}`}
          className="w-7 h-7 text-yellow-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.435 8.206 1.181-5.951 5.79 1.406 8.175-7.329-3.851-7.329 3.851 1.406-8.175-5.951-5.79 8.206-1.181L12 .587z" />
        </svg>
      ))}
      {halfStar === 1 && (
        <svg
          className="w-7 h-7 text-yellow-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.435 8.206 1.181-5.951 5.79 1.406 8.175-7.329-3.851-7.329 3.851 1.406-8.175-5.951-5.79 8.206-1.181L12 .587z" />
          <path
            fill="white"
            d="M12 1.5l3.04 6.17 6.81.98-4.94 4.78 1.16 6.76-6.07-3.18-6.07 3.18 1.16-6.76-4.94-4.78 6.81-.98L12 1.5z"
          />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={`empty-${i}`}
          className="w-7 h-7 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.435 8.206 1.181-5.951 5.79 1.406 8.175-7.329-3.851-7.329 3.851 1.406-8.175-5.951-5.79 8.206-1.181L12 .587z" />
        </svg>
      ))}
    </div>
  );
}

export default StarRating;
