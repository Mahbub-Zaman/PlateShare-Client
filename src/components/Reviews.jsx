import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  // Fetch reviews
  useEffect(() => {
    fetch('/reviews.json')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error('Error loading reviews:', err));
  }, []);

  const handleToggle = () => {
    if (visibleCount >= reviews.length) {
      setVisibleCount(6);
    } else {
      setVisibleCount(prev => Math.min(prev + 3, reviews.length));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Toaster />
      <h1 className="text-3xl font-bold mb-8 text-center">🎓 Our Students’ Reviews</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.slice(0, visibleCount).map((review, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100} // stagger animation
            className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center font-bold text-purple-800">
                {review.reviewerName[0]}
              </div>
              <div className="ml-3">
                <h3 className="font-semibold">{review.reviewerName}</h3>
                <p className="text-sm text-gray-500">{review.courseName}</p>
              </div>
            </div>
            <div className="flex mb-2">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <span
                  key={starIndex}
                  className={`${starIndex < review.star ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>

      {reviews.length > 6 && (
        <div className="flex justify-center mt-8">
          <button className="btn btn-primary" onClick={handleToggle}>
            {visibleCount >= reviews.length ? 'See Less' : 'See More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
