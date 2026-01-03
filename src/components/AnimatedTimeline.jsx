import React, { useEffect, useRef, useState } from "react";
import { FaRecycle, FaHeart, FaLeaf } from "react-icons/fa";

const AnimatedTimeline = ({ timeline }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const timelineTop = timelineRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const totalHeight = timelineRef.current.offsetHeight;

        // calculate progress: 0 to 1
        const progress = Math.min(Math.max((windowHeight - timelineTop) / totalHeight, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-w-6xl mx-auto mb-24" ref={timelineRef}>
      <h2 className="text-3xl font-bold text-center mb-14 black">Our Journey</h2>

      <div className="relative">
        {/* Vertical line background */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-green-200 dark:border-gray-600"></div>

        {/* Animated fill line */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-green-500 origin-top"
          style={{ height: `${scrollProgress * 100}%` }}
        ></div>

        {timeline.map((item, index) => {
          const icons = [<FaRecycle />, <FaLeaf />, <FaHeart />];
          return (
            <div key={index} className="mb-16 relative flex flex-col md:flex-row items-center justify-center">
              {/* Dot with icon */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10 w-8 h-8 bg-green-500 rounded-full shadow-lg flex items-center justify-center text-white">
                {icons[index % icons.length]}
              </div>

              {/* Card */}
              <div
                className={`secondary-bg p-6 rounded-2xl shadow-md md:w-1/3 text-center transition transform hover:-translate-y-1
                  ${index % 2 === 0 ? "md:ml-auto md:mr-8" : "md:mr-auto md:ml-8"}`}
              >
                <p className="font-semibold text-green-600 text-lg">{item.year}</p>
                <p className="black mt-2">{item.event}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedTimeline;
