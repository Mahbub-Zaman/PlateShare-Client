import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";

const API_BASE = "http://localhost:3000";

const Test = () => {
  const { user } = useAuth();
  const { role, loading: roleLoading, error: roleError } = useUserRole();

  const [requests, setRequests] = useState([]);
  const [foods, setFoods] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(null);

  // Fetch foods and requests in one effect
  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        setPageLoading(true);
        setPageError(null);

        // Fetch all foods
        const foodsRes = await fetch(`${API_BASE}/foods`);
        if (!foodsRes.ok) throw new Error("Failed to fetch foods");
        const foodsData = await foodsRes.json();

        // Filter foods donated by this user
        const myFoods = foodsData.foods
          ? foodsData.foods.filter((f) => f.donator_email === user.email)
          : [];
        setFoods(myFoods);

        // Fetch user's requests
        const requestsRes = await fetch(
          `${API_BASE}/myFoodRequests?userEmail=${user.email}`
        );
        if (!requestsRes.ok) throw new Error("Failed to fetch requests");
        const requestsData = await requestsRes.json();
        setRequests(Array.isArray(requestsData) ? requestsData : []);
      } catch (err) {
        console.error(err);
        setPageError(err.message || "Something went wrong");
        setFoods([]);
        setRequests([]);
      } finally {
        setPageLoading(false);
      }
    };

    fetchData();
  }, [user?.email]);

  if (roleLoading || pageLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/loader.gif" alt="Loading..." />
      </div>
    );
  }

  if (roleError) {
    return <p className="text-red-500">Error loading role: {roleError}</p>;
  }

  if (pageError) {
    return <p className="text-red-500">Error loading data: {pageError}</p>;
  }

  const accepted = requests.filter((r) => r.status === "accepted").length;
  const pending = requests.filter((r) => r.status === "pending").length;
  const totalServed = requests.reduce(
    (sum, r) => sum + (Number(r.quantity) || 0),
    0
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Home</h1>

      <div className="mb-4">
        <p>Total requests: {requests.length}</p>
        <p>Accepted: {accepted}</p>
        <p>Pending: {pending}</p>
        <p>Total served: {totalServed}</p>
        <p>Total foods donated: {foods.length}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl mb-2">Role: {role}</h2>
        {role === "Admin" && <h2 className="text-green-600">Welcome Admin</h2>}
        {role === "User" && <h2 className="text-blue-600">Welcome User</h2>}
      </div>
    </div>
  );
};

export default Test;
