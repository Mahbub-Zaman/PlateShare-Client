import React, { useEffect, useState } from "react";
import FoodCard from "../../components/FoodCard/FoodCard";

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & search & sort
  const [search, setSearch] = useState("");
  const [minServe, setMinServe] = useState("");
  const [notExpired, setNotExpired] = useState(false);
  const [sort, setSort] = useState("newest");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  // Sidebar toggle
  const [showFilters, setShowFilters] = useState(false);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        minServe,
        notExpired,
        sort,
        page,
        limit,
      });

      const res = await fetch(`https://plateshare-api-server-beige.vercel.app/foods?${params.toString()}`);
      const data = await res.json();

      setFoods(data.foods || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching foods:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
    // eslint-disable-next-line
  }, [search, minServe, notExpired, sort, page]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/loader.gif" alt="loader" />
      </div>
    );
  }

  return (
    <div className="px-6 py-12 mx-auto max-w-7xl relative">
      <title>PlateShare | Available Foods</title>
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        All Available Foods
      </h1>

      {/* Top controls: Filter button, Search, Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        {/* Filter button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn btn-outline btn-sm md:btn-md"
        >
          Filters
        </button>

        {/* Middle: Search */}
        <div className="w-full md:w-1/2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search foods..."
            className="input input-bordered w-full"
          />
        </div>

        {/* Right: Sorting */}
        <div className="w-[140px]">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name_asc">Name A-Z</option>
            <option value="name_desc">Name Z-A</option>
          </select>
        </div>
      </div>

      {/* Sidebar for Filters */}
      <div
  className={`fixed top-0 left-0 h-full w-80 secondary-bg shadow-lg z-50 transform transition-transform duration-300 ${
    showFilters ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col gap-4 h-full">
          <h2 className="text-xl font-bold mb-4">Filters</h2>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Minimum Serves</label>
            <input
              type="number"
              min={1}
              value={minServe}
              onChange={(e) => setMinServe(e.target.value)}
              placeholder="Enter number of people"
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={notExpired}
              onChange={(e) => setNotExpired(e.target.checked)}
              className="checkbox"
            />
            <label className="font-semibold">Not Expired</label>
          </div>

          {/* Close Sidebar */}
          <button
            onClick={() => setShowFilters(false)}
            className="btn btn-sm btn-outline mt-auto"
          >
            Close
          </button>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {showFilters && (
        <div
          onClick={() => setShowFilters(false)}
          className="fixed inset-0 z-40"
        ></div>
      )}

      {foods.length === 0 ? (
        <p className="text-center text-gray-600">No foods available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex gap-2 mt-8 justify-center flex-wrap">
        <button
          className="btn btn-sm btn-outline"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`btn btn-sm ${page === i + 1 ? "btn-primary" : "btn-outline"}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-sm btn-outline"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllFoods;
