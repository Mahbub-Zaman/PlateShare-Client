import { useEffect, useState } from "react";

const ManageFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6; // items per page

  // Fetch foods from server
  const fetchFoods = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://plateshare-api-server-beige.vercel.app/admin/foods?page=${page}&limit=${itemsPerPage}`
      );
      const data = await res.json();
      setFoods(data.foods || []);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
    } catch (err) {
      console.error("Failed to fetch foods:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods(currentPage);
  }, [currentPage]);

  // Toggle food status
  const handleStatusChange = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "Available" ? "Not Available" : "Available";

    try {
      const res = await fetch(`https://plateshare-api-server-beige.vercel.app/admin/foods/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ food_status: newStatus }),
      });

      if (res.ok) {
        setFoods((prev) =>
          prev.map((food) =>
            food._id === id ? { ...food, food_status: newStatus } : food
          )
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Handle next/previous
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/loader.gif" alt="loader" />
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-3xl text-primary font-bold mb-4">Manage Foods</h2>

      <div className="overflow-x-auto rounded-lg">
        <table className="table w-full">
          <thead className="secondary-bg">
            <tr>
              <th>Food</th>
              <th>Quantity</th>
              <th>Donator</th>
              <th>Status</th>
              <th>Food Info</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {foods.map((food) => (
              <tr key={food._id}>
                {/* FOOD + IMAGE */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-14 h-14">
                        <img
                          loading="lazy"
                          src={
                            food.food_image ||
                            "https://via.placeholder.com/100?text=Food"
                          }
                          alt={food.food_name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{food.food_name}</div>
                      <div className="text-sm opacity-50">
                        {food.pickup_location}
                      </div>
                    </div>
                  </div>
                </td>

                {/* QUANTITY */}
                <td>{food.food_quantity}</td>

                {/* DONATOR IMAGE + NAME */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img
                          loading="lazy"
                          src={food.donator_photo || food.donator_image || "/Avatar.jpeg"}
                          alt={food.donator_name || "Donator"}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">
                        {food.donator_name || "Donator"}
                      </div>
                      <div className="text-xs opacity-60">
                        {food.donator_email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* STATUS */}
                <td>
                  <span
                    className={`badge ${
                      food.food_status === "Available"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {food.food_status}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() =>
                      (window.location.href = `/dashboard/food/${food._id}`)
                    }
                    className="btn btn-sm btn-primary"
                  >
                    View Details
                  </button>
                </td>

                {/* ACTIONS */}
                <td>
                  <button
                    onClick={() =>
                      handleStatusChange(food._id, food.food_status)
                    }
                    className="btn btn-sm btn-warning"
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="btn btn-sm btn-outline"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn btn-sm ${
              currentPage === i + 1 ? "btn-primary" : "btn-outline"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="btn btn-sm btn-outline"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageFoods;
