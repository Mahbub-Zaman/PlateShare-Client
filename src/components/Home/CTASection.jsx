import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaHandsHelping } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const CTASection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCTA = () => {
    if (user) {
      toast("You are already logged in!", { icon: "✅" });
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="bg-primary/80 backdrop-blur-md py-12 text-center relative overflow-hidden">
      
      {/* Animated Hands Icon with glow */}
      <FaHandsHelping className="text-5xl text-white mx-auto mb-2 animate-bounce drop-shadow-lg" />

      {/* Heading */}
      <h2 className="text-4xl font-bold mb-2 text-white">
        Join <span className="text-black/90">PlateShare</span> Today!
      </h2>

      {/* Divider */}
      <hr className="w-24 mx-auto border-t-2 border-green-300 mb-4" />

      {/* Paragraph */}
      <p className="mb-6 text-black text-xl max-w-2xl mx-auto">
        Donate or request food today and help reduce food waste while supporting your community.
      </p>

      {/* Call to Action Button */}
      <button
        onClick={handleCTA}
        className="btn btn-primary px-6 py-3 rounded-lg hover:btn-accent transform hover:scale-105 transition-transform duration-300"
      >
        Sign Up Now
      </button>

      {/* Optional floating decorations */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-gray-500 opacity-20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gray-500 opacity-20 rounded-full translate-x-1/2 translate-y-1/2 animate-pulse"></div>
    </div>
  );
};

export default CTASection;
