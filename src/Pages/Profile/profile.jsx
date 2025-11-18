import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import SkillCard from '../../components/SkillCard';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center mt-16 px-4">
      <title>PlateShare | Profile</title>
      <div className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        
        {/* Profile Image */}
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
          <img
            src={user?.photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-50 h-50 rounded-lg object-cover border-2 border-gray-200"
          />
        </div>

                {/* Divider Line */}
        {/* Vertical line for desktop, hidden on mobile */}
        <div className="hidden sm:block w-px h-32 bg-gray-300 sm:mr-8 mx-6"></div>

        {/* Horizontal line for mobile, hidden on desktop */}
        <div className="block sm:hidden w-full h-px bg-gray-300 mb-4"></div>

        {/* Profile Info */}
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold text-gray-900 mb-3">My Profile</h2>

          <div className="mb-3">
            <p className="text-gray-500 text-sm">Full Name</p>
            <p className="font-semibold text-gray-800">
              {user?.displayName || "No Name"}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-gray-500 text-sm">Email Address</p>
            <p className="font-semibold text-gray-800">
              {user?.email || "No Email"}
            </p>
          </div>

          <button
            onClick={() => navigate("/update-profile")}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8a.375.375 0 01-.465-.465l.8-2.685a4.5 4.5 0 011.13-1.897L16.862 4.487zm0 0L19.5 7.125"
              />
            </svg>
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
