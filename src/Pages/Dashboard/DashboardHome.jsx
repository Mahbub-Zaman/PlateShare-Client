import React from "react";
import { FiBookOpen, FiShoppingCart, FiUser } from "react-icons/fi";

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-base-200 p-6 rounded-lg shadow text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-gray-600">
          Access your profile, requests, and available items quickly.
        </p>
      </div>

      {/* Quick Access / Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <button className="bg-purple-500 text-white rounded-lg p-6 shadow hover:bg-purple-600 transition flex flex-col items-center gap-2">
          <FiBookOpen className="w-6 h-6" />
          <span>View Items</span>
        </button>

        <button className="bg-blue-500 text-white rounded-lg p-6 shadow hover:bg-blue-600 transition flex flex-col items-center gap-2">
          <FiShoppingCart className="w-6 h-6" />
          <span>My Requests</span>
        </button>

        <button className="bg-green-500 text-white rounded-lg p-6 shadow hover:bg-green-600 transition flex flex-col items-center gap-2">
          <FiUser className="w-6 h-6" />
          <span>Profile</span>
        </button>
      </div>

      {/* Notifications / Updates */}
      <div className="bg-base-200 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Notifications</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Your last request was approved.</li>
          <li>New items have been added recently.</li>
          <li>Remember to update your profile information.</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;
