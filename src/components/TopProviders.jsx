import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const TopProviders = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    fetch("/topProviders.json")
      .then((res) => res.json())
      .then((data) => setProviders(data))
      .catch((err) => console.error("Error loading top providers:", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        🌟 Top Rated Providers
      </h2>

      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {providers.map((provider, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 text-center transition-transform transform hover:scale-105 duration-300">
              <img
                src={provider.image}
                alt={provider.providerName}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-purple-400"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {provider.providerName}
              </h3>
              <p className="text-sm text-gray-500">{provider.skillName}</p>
              <p className="mt-2 text-yellow-500 font-bold">
                ⭐ {provider.rating}
              </p>
              <p className="text-xs text-gray-400 mt-1">{provider.providerEmail}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopProviders;
