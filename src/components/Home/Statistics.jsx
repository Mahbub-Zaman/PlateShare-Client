import React, { useEffect, useState } from "react";
import { FiUsers, FiShoppingCart, FiStar, FiCoffee } from "react-icons/fi";

const statsData = [
  { icon: <FiUsers />, value: 1200, label: "Happy Users" },
  { icon: <FiShoppingCart />, value: 850, label: "Donated Foods" },
  { icon: <FiStar />, value: 500, label: "Positive Reviews" },
  { icon: <FiCoffee />, value: 200, label: "Partner Restaurants" },
];

const Statistics = () => {
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const intervals = statsData.map((stat, index) => {
      const increment = Math.ceil(stat.value / 100);
      return setInterval(() => {
        setCounts((prev) => {
          const newCounts = [...prev];
          if (newCounts[index] < stat.value) {
            newCounts[index] = Math.min(newCounts[index] + increment, stat.value);
          }
          return newCounts;
        });
      }, 20);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section className="py-12 primary-bg">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-green-500 mb-10">
          Our Impact in Numbers
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {statsData.map((stat, i) => (
            <div
              key={i}
              className="secondary-bg rounded-xl shadow-md p-4 flex flex-col items-center gap-2 hover:scale-105 hover:shadow-lg transform transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl text-green-500">{stat.icon}</div>
              <h3 className="text-2xl sm:text-3xl font-bold mt-1">{counts[i]}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
