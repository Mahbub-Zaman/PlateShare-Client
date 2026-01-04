import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Testimonials = () => {
  const feedbacks = [
    { name: "Jane Smith", comment: "Amazing platform, helped me donate food easily!", img: "https://i.ibb.co.com/jPLL5qHv/pexels-kaleef-lawal-1481864847-27897903.jpg" },
    { name: "Alexa Emmi", comment: "Very reliable and user-friendly!", img: "https://i.ibb.co.com/bMRpRS5K/pexels-eric-saint-martin-939233568-28982304.jpg" },
    { name: "Ali Khan", comment: "Great initiative to reduce food waste.", img: "https://i.ibb.co.com/LdJx7zqy/pexels-sa-foysal-1893409-6409119.jpg" },
  ];

  return (
    <section className="py-16 secondary-bg">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-400 mb-10">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {feedbacks.map((f, i) => (
            <div
              key={i}
              className="primary-bg p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <FaQuoteLeft className="text-green-400 mb-4 text-xl" />
              <p className="decription mb-4">"{f.comment}"</p>
              <div className="flex items-center gap-3 justify-center">
                <img
                  src={f.img}
                  alt={f.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="font-semibold">{f.name}</span>
              </div>
              <FaQuoteRight className="text-green-400 mt-4 text-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
