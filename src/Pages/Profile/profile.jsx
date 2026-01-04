import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center items-start p-6 pt-20">
      <title>PlateShare | Profile</title>

      <div className="secondary-bg shadow-2xl rounded-3xl p-8 max-w-4xl w-full flex flex-col md:flex-row items-center md:items-start gap-8">
        
        {/* Left Side: Image */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-start gap-4">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full border-4 border-green-400 shadow-lg"
          />
        </div>

        {/* Divider for desktop */}
        <div className="hidden md:block w-px bg-gray-300 h-full rounded-full"></div>

        {/* Right Side: Info */}
        <div className="flex-1 text-left space-y-4">
          <h2 className="text-3xl font-bold text-green-500">My Profile</h2>
          <p className="text-gray-500">Manage your account details and personal info</p>

          {/* Full Name */}
          <div className="flex gap-4">
            <span className="font-medium description w-32">Full Name :</span>
            <span className="font-semibold black">{user?.displayName || "No Name"}</span>
          </div>

          {/* Email */}
          <div className="flex gap-4">
            <span className="font-medium description w-32">Email :</span>
            <span className="font-semibold black">{user?.email || "No Email"}</span>
          </div>

          {/* Joined Date */}
          <div className="flex gap-4">
            <span className="font-medium description w-32">Joined :</span>
            <span className="font-semibold black">
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : "Unknown"}
            </span>
          </div>

          {/* Update Profile Button */}
          <button
            onClick={() => navigate("/dashboard/update-profile")}
            className="mt-6 inline-flex items-center gap-2 px-6 py-2 bg-green-400 hover:bg-green-500 text-white font-semibold rounded-full transition shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
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
