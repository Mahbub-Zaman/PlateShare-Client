import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Trending = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("/Skills.json")
      .then((res) => res.json())
      .then((data) => {
        const topRated = data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 8);
        setSkills(topRated);
      })
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="text-3xl font-bold text-center mb-8">
        🔰 Trending Skills
      </h2>

      <Swiper
        spaceBetween={35}
        slidesPerView={3}
        autoplay={{
          delay: 2700,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-purple-400",
        }}
        modules={[Autoplay, Pagination]}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {skills.map((skill, index) => (
          <SwiperSlide key={index}>
            <div className="relative bg-white/70 backdrop-blur-md rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300 p-5 border border-purple-100">
              {/* Image */}
              <div className="rounded-lg overflow-hidden mb-4">
                <img
                  src={skill.image}
                  alt={skill.skillName}
                  className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Skill Info */}
              <div className="flex flex-col flex-1">
                <h3 className="text-[18px] font-semibold mb-2 text-gray-800">
                  {skill.skillName}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <p className="font-semibold text-green-700">${skill.price}</p>
                  <p className="text-yellow-500 font-semibold">
                    ⭐ {skill.rating}
                  </p>
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                    {skill.category}
                  </span>
                </div>
              </div>

              {/* Gradient border glow */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Trending;
