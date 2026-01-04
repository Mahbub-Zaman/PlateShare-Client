import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import {
  FiUsers,
  FiUserCheck,
  FiUserMinus,
  FiBox,
  FiShoppingCart,
  FiCheckCircle,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [activityPage, setActivityPage] = useState(1);
  const [activityTotal, setActivityTotal] = useState(0);
  const activityLimit = 10;

  const activityTotalPages = Math.ceil(activityTotal / activityLimit);

  useEffect(() => {
    // Fetch stats
    fetch("https://plateshare-api-server-beige.vercel.app/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));

    // Fetch recent activity with pagination
    fetch(
      `https://plateshare-api-server-beige.vercel.app/admin/recent-activity?page=${activityPage}&limit=${activityLimit}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRecentActivity(data.activities || []);
        setActivityTotal(data.total || 0);
      })
      .catch((err) => console.error(err));
  }, [activityPage]);

  if (!stats) return <div className="flex justify-center items-center h-screen">
  <img src="/loader.gif" alt="Loading..." />
</div>;

  

  const statCards = [
    { title: "Total Users", value: stats.totalUsers, icon: <FiUsers className="w-6 h-6" />, color: "bg-blue-500" },
    { title: "Admins", value: stats.totalAdmins, icon: <FiUserCheck className="w-6 h-6" />, color: "bg-green-500" },
    { title: "Regular Users", value: stats.totalRegularUsers, icon: <FiUserMinus className="w-6 h-6" />, color: "bg-yellow-500" },
    { title: "Total Foods", value: stats.totalFoods, icon: <FiBox className="w-6 h-6" />, color: "bg-purple-500" },
    { title: "Available Foods", value: stats.totalAvailableFoods, icon: <FiShoppingCart className="w-6 h-6" />, color: "bg-indigo-500" },
    { title: "Served Foods", value: stats.totalServedFoods, icon: <FiCheckCircle className="w-6 h-6" />, color: "bg-red-500" },
  ];

  const usersChartData = [
    { name: "Admins", value: stats.totalAdmins },
    { name: "Regular Users", value: stats.totalRegularUsers },
  ];

  const foodsChartData = [
    { name: "Available", value: stats.totalAvailableFoods },
    { name: "Served", value: stats.totalServedFoods },
  ];

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE"];

  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">Quick overview of platform stats and activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card, index) => (
          <div key={index} className="bg-base-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow flex items-center gap-4">
            <div className={`p-3 text-white rounded-full flex items-center justify-center ${card.color}`}>{card.icon}</div>
            <div>
              <h2 className="text-xl font-bold">{card.value}</h2>
              <p className="text-gray-500">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-base-200 p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Users Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={usersChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                {usersChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-base-200 p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Foods Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={foodsChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-base-200 p-4 rounded-lg shadow overflow-x-auto">
        
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
          <div className="flex justify-end mt-2">
            <NavLink to="/dashboard/activity">
              <button className="btn btn-sm btn-primary">
                View All
              </button>
            </NavLink>
          </div>
        </div>
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Action</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((activity, idx) => (
              <tr key={idx}>
                <td>{(activityPage - 1) * activityLimit + idx + 1}</td>
                <td>{activity.user}</td>
                <td>{activity.action}</td>
                <td>{new Date(activity.time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-3 gap-2 flex-wrap">
          <button className="btn btn-sm btn-outline" onClick={() => setActivityPage(p => Math.max(p - 1, 1))} disabled={activityPage === 1}>Previous</button>
          {Array.from({ length: activityTotalPages }, (_, i) => {
            const page = i + 1;
            if (page === 1 || page === activityTotalPages || (page >= activityPage - 2 && page <= activityPage + 2)) {
              return (
                <button key={page} className={`btn btn-sm ${activityPage === page ? "btn-primary" : "btn-outline"}`} onClick={() => setActivityPage(page)}>
                  {page}
                </button>
              );
            }
            if ((page === activityPage - 3 && page > 1) || (page === activityPage + 3 && page < activityTotalPages)) {
              return <span key={page} className="px-2 py-1">...</span>;
            }
            return null;
          })}
          <button className="btn btn-sm btn-outline" onClick={() => setActivityPage(p => Math.min(p + 1, activityTotalPages))} disabled={activityPage === activityTotalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
