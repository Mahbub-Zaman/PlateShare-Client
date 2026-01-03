import React from 'react';
import { FaHeart, FaRecycle, FaUsers } from 'react-icons/fa';

const Why = () => {
  // Array of card data
  const reasons = [
    {
      icon: <FaRecycle className="text-4xl text-green-500 mx-auto mb-4" />,
      title: "Reduce Waste",
      description:
        "Prevent food from going to landfills and redirect it to those in need.",
    },
    {
      icon: <FaUsers className="text-4xl text-green-500 mx-auto mb-4" />,
      title: "Build Community",
      description:
        "Strengthen local communities through sharing and collaboration.",
    },
    {
      icon: <FaHeart className="text-4xl text-green-500 mx-auto mb-4" />,
      title: "Help People",
      description:
        "Connect donors with recipients to ensure food reaches those who need it.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto my-16 text-center">
      <h2 className="text-3xl font-bold mb-2 text-green-500">Why PlateShare?</h2>
                  {/* Divider */}
      <hr className="w-26 mx-auto border-t-2 border-green-400 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className={`secondary-bg shadow-md rounded-2xl p-8 text-center hover:shadow-xl transition transform hover:-translate-y-1`}
          >
            {reason.icon}
            <h3 className="font-semibold text-xl mb-2">{reason.title}</h3>
            <p className="black">{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Why;
