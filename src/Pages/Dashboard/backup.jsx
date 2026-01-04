import React, { useEffect, useState } from "react";
import {
  FiBookOpen,
  FiShoppingCart,
  FiUser,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import axios from "axios";

const DashboardHome = ({ userEmail }) => {
  const [stats, setStats] = useState({
    totalFoods: 0,
    totalRequests: 0,
    approvedRequests: 0,
    pendingRequests: 0,
  });

  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // 1️⃣ Fetch total foods
        const foodsRes = await axios.get("http://localhost:3000/foods?limit=1000");
        const foods = foodsRes.data.foods || [];
        const totalFoods = foods.length;

        // 2️⃣ Fetch user's requests
        const requestsRes = await axios.get(
          `http://localhost:3000/myFoodRequests?userEmail=${userEmail}`
        );
        const requests = requestsRes.data || [];

        // Map requests to include food name
        const recentRequestsWithNames = await Promise.all(
          requests.map(async (req) => {
            // Fetch food name by foodId
            const foodRes = await axios.get(
              `http://localhost:3000/foods/${req.foodId}`
            );
            return {
              id: req._id,
              food: foodRes.data.food_name || "Food Item",
              status: req.status || "Pending",
              date: new Date(req.createdAt).toLocaleDateString(),
            };
          })
        );

        const approvedRequests = recentRequestsWithNames.filter(
          (r) => r.status === "Approved"
        ).length;
        const pendingRequests = recentRequestsWithNames.length - approvedRequests;

        setStats({
          totalFoods,
          totalRequests: recentRequestsWithNames.length,
          approvedRequests,
          pendingRequests,
        });

        // Sort recent requests by date (latest first)
        recentRequestsWithNames.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setRecentRequests(recentRequestsWithNames);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userEmail]);

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-base-200 p-6 rounded-lg shadow text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-gray-600">
          Here’s an overview of your account, requests, and available foods.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-purple-500 text-white rounded-lg p-6 shadow flex flex-col items-center gap-2">
          <FiBookOpen className="w-6 h-6" />
          <span>Total Foods</span>
          <span className="text-xl font-bold">{stats.totalFoods}</span>
        </div>
        <div className="bg-blue-500 text-white rounded-lg p-6 shadow flex flex-col items-center gap-2">
          <FiShoppingCart className="w-6 h-6" />
          <span>Total Requests</span>
          <span className="text-xl font-bold">{stats.totalRequests}</span>
        </div>
        <div className="bg-green-500 text-white rounded-lg p-6 shadow flex flex-col items-center gap-2">
          <FiCheckCircle className="w-6 h-6" />
          <span>Approved Requests</span>
          <span className="text-xl font-bold">{stats.approvedRequests}</span>
        </div>
        <div className="bg-yellow-500 text-white rounded-lg p-6 shadow flex flex-col items-center gap-2">
          <FiClock className="w-6 h-6" />
          <span>Pending Requests</span>
          <span className="text-xl font-bold">{stats.pendingRequests}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <button className="bg-purple-500 text-white rounded-lg p-6 shadow hover:bg-purple-600 transition flex flex-col items-center gap-2">
          <FiBookOpen className="w-6 h-6" />
          <span>Browse Foods</span>
        </button>
        <button className="bg-blue-500 text-white rounded-lg p-6 shadow hover:bg-blue-600 transition flex flex-col items-center gap-2">
          <FiShoppingCart className="w-6 h-6" />
          <span>Create Request</span>
        </button>
        <button className="bg-green-500 text-white rounded-lg p-6 shadow hover:bg-green-600 transition flex flex-col items-center gap-2">
          <FiUser className="w-6 h-6" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Recent Requests Table */}
      <div className="bg-base-200 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Recent Requests</h2>
        {recentRequests.length === 0 ? (
          <p className="text-gray-600">No recent requests.</p>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Food</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((req) => (
                <tr key={req.id}>
                  <td>{req.food}</td>
                  <td
                    className={`font-semibold ${
                      req.status === "Approved"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {req.status}
                  </td>
                  <td>{req.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
