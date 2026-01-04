import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import { FiPackage, FiClipboard, FiCheckCircle, FiClock, FiUser } from "react-icons/fi";
import { BiDonateHeart } from "react-icons/bi";
import { PiBowlFoodLight } from "react-icons/pi";

const API_BASE = "https://plateshare-api-server-beige.vercel.app";

const DashboardHome = () => {
  const { user } = useAuth();
  const { role, loading: roleLoading } = useUserRole();

  const [donatedFoods, setDonatedFoods] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loadingFoods, setLoadingFoods] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    if (!user?.email) return;

    const fetchFoods = async () => {
      setLoadingFoods(true);
      try {
        const res = await fetch(
          `${API_BASE}/foods?donator_email=${user.email}&page=${page}&limit=${limit}`
        );
        const data = await res.json();
        setDonatedFoods(data.foods || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Failed to fetch donated foods", err);
        setDonatedFoods([]);
      } finally {
        setLoadingFoods(false);
      }
    };

    fetchFoods();
  }, [user?.email, page]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${API_BASE}/myFoodRequests?userEmail=${user.email}`)
      .then((res) => res.json())
      .then((data) => setRequests(Array.isArray(data) ? data : []))
      .catch(() => setRequests([]))
      .finally(() => setLoadingRequests(false));
  }, [user?.email]);

  const totalFoods = donatedFoods.length;
  const totalRequests = requests.length;
  const accepted = requests.filter((r) => r.status === "accepted").length;
  const pending = requests.filter((r) => r.status === "pending").length;

  if (loadingFoods || loadingRequests || roleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/loader.gif" alt="loader" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Welcome */}
      <div className="bg-base-200 p-6 rounded-lg shadow text-center">
        <h1 className="text-2xl font-bold mb-2">
          Welcome,{" "}
          <span className={role === "Admin" ? "text-green-500" : "text-blue-500"}>
            {user?.displayName || "User"}!
          </span>
        </h1>
        <p className="text-gray-600">
          Here’s an overview of your donated foods and requests.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-purple-500 text-white p-4 rounded shadow text-center flex flex-col items-center gap-2">
          <FiPackage className="w-6 h-6" />
          <span>Total Foods</span>
          <div className="text-xl font-bold">{totalFoods}</div>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded shadow text-center flex flex-col items-center gap-2">
          <FiClipboard className="w-6 h-6" />
          <span>Total Requests</span>
          <div className="text-xl font-bold">{totalRequests}</div>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow text-center flex flex-col items-center gap-2">
          <FiCheckCircle className="w-6 h-6" />
          <span>Accepted Requests</span>
          <div className="text-xl font-bold">{accepted}</div>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded shadow text-center flex flex-col items-center gap-2">
          <FiClock className="w-6 h-6" />
          <span>Pending Requests</span>
          <div className="text-xl font-bold">{pending}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <NavLink
          to="/foods"
          className="bg-purple-500 text-white rounded-lg p-6 shadow hover:bg-purple-600 transition flex flex-col items-center gap-2"
        >
          <PiBowlFoodLight className="w-6 h-6" />
          <span>Browse Foods</span>
        </NavLink>

        <NavLink
          to="/dashboard/add-food"
          className="bg-blue-500 text-white rounded-lg p-6 shadow hover:bg-blue-600 transition flex flex-col items-center gap-2"
        >
          <BiDonateHeart className="w-6 h-6" />
          <span>Donate Food</span>
        </NavLink>

        <NavLink
          to="/update-profile"
          className="bg-green-500 text-white rounded-lg p-6 shadow hover:bg-green-600 transition flex flex-col items-center gap-2"
        >
          <FiUser className="w-6 h-6" />
          <span>Edit Profile</span>
        </NavLink>
      </div>

{/* Donated Foods Table */}
<div className="bg-base-200 p-4 rounded-lg shadow mt-6">
  <h2 className="text-xl text-primary font-bold mb-4">My Donated Foods</h2>

  {donatedFoods.length === 0 ? (
    <p>No donated foods found.</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left text-gray-500 uppercase text-sm border-b border-gray-300">
            <th className="p-3">Image</th>
            <th className="p-3">Food Name</th>
            <th className="p-3">Total Serves</th>
            <th className="p-3">Pickup Location</th>
            <th className="p-3">Expire Date</th>
          </tr>
        </thead>
        <tbody>
          {donatedFoods.map((food) => (
            <tr key={food._id} className="hover:bg-gray-100 transition">
              <td className="p-2">
                <img
                  src={food.food_image}
                  alt={food.food_name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </td>
              <td className="p-3 font-medium">{food.food_name}</td>
              <td className="p-3">{food.food_quantity}</td>
              <td className="p-3">{food.pickup_location}</td>
              <td className="p-3">{food.expire_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {/* Pagination */}
  <div className="flex justify-end gap-2 mt-4">
    <button
      className="px-3 py-1 btn-primary rounded disabled:opacity-60"
      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      disabled={page === 1}
    >
      Prev
    </button>
    <span className="px-3 py-1">{page}</span>
    <button
      className="px-3 py-1 btn-primary rounded disabled:opacity-60"
      onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={page === totalPages}
    >
      Next
    </button>
  </div>
</div>

    </div>
  );
};

export default DashboardHome;
