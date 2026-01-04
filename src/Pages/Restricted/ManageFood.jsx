import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const API_BASE = "https://plateshare-api-server-beige.vercel.app";

const ManageFood = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    if (!user?.email) return;

    const fetchFoods = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/foods?donator_email=${user.email}&page=${page}&limit=${limit}`
        );
        const data = await res.json();

        if (!data) {
          setFoods([]);
          setTotalPages(1);
        } else if (Array.isArray(data)) {
          setFoods(data);
          setTotalPages(1);
        } else if (data.foods && Array.isArray(data.foods)) {
          setFoods(data.foods);
          setTotalPages(data.totalPages || 1);
        } else {
          setFoods([data]);
          setTotalPages(1);
        }
      } catch (err) {
        console.error("Error fetching foods:", err);
        toast.error("Failed to fetch your foods.");
        setFoods([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [user?.email, page]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${API_BASE}/foods/${id}`, { method: "DELETE" });
          const data = await res.json();
          if (data.deletedCount > 0) {
            toast.success("Food deleted successfully!");
            setFoods((prev) => prev.filter((food) => food._id !== id));
          } else {
            toast.error("Failed to delete food.");
          }
        } catch (err) {
          console.error(err);
          toast.error("Failed to delete food.");
        }
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/dashboard/update-food/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/loader.gif" alt="loader" />
      </div>
    );
  }

  return (
    <div className="px-6 py-12 mx-auto max-w-6xl">
      <title>PlateShare | Manage My Food</title>
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        Manage Your Foods
      </h1>

      {foods.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't added any foods yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="secondary-bg text-left">
                <th className="p-3">Image</th>
                <th className="p-3">Food Name</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Pickup Location</th>
                <th className="p-3">Expire Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id} className="hover:bg-secondary transition text-left">

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
                  <td className="p-3">{food.food_status}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleUpdate(food._id)}
                      className="btn btn-sm btn-warning"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
      )}
    </div>
  );
};

export default ManageFood;
