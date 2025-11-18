import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaUserPlus, FaChalkboardTeacher, FaCheckCircle } from 'react-icons/fa';
import { IoFastFood } from "react-icons/io5";


const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-4xl text-green-500 mb-4" />,
      title: 'Sign Up',
      description: 'Create your free account and join the SkillSwap community to start learning or teaching.',
    },
    {
      icon: <IoFastFood className="text-4xl text-green-500 mb-4" />,
      title: 'Post Food',
      description: 'Share your extra food by creating a post with details like name, description, quantity, pickup location, and expiry time.',
    },
    {
      icon: <FaChalkboardTeacher className="text-4xl text-green-500 mb-4" />,
      title: 'Find Food',
      description: 'Browse food items shared by the community, filter by category or location, and request the items you need with a simple click.',
    },
    {
      icon: <FaCheckCircle className="text-4xl text-green-500 mb-4" />,
      title: 'Collect Food',
      description: 'After your request is approved, coordinate the pickup time with the donor and collect the food safely and conveniently.',
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000,once: false,
    mirror: true,});
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-green-500 mb-8">How It Works</h2>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            {step.icon}
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
