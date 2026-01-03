import React, { useEffect, useState } from "react";
import FoodCard from "../FoodCard/FoodCard";

export default function FeaturedFoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const loadFoods = () => {
    setLoading(true); // start loading
    fetch("https://plateshare-api-server-beige.vercel.app/featured-foods")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setLoading(false); // stop loading after data is fetched
      })
      .catch((err) => {
        console.error("Error fetching foods:", err);
        setLoading(false); // stop loading even if error occurs
      });
  };

  useEffect(() => {
    loadFoods();
  }, []);

  return (
    <div className="px-6 py-12 mx-auto max-w-6xl">
      <h1 className="text-3xl text-center font-bold text-green-400 mb-8">
        Latest Food Items
      </h1>

      {loading ? (
        // Loader GIF from public folder
        <div className="flex justify-center">
          <img
            src="/loader.gif"
            alt="Loading..."
            className="w-20 h-20"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
}
