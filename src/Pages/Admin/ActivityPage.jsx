import React, { useEffect, useState } from "react";

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 20;

  useEffect(() => {
    setLoading(true);

    fetch(`https://plateshare-api-server-beige.vercel.app/admin/recent-activity?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setActivities(data.activities || []);
        setTotal(data.total || 0);
      })
      .catch((err) => {
        console.error("Failed to fetch activities:", err);
        setActivities([]);
        setTotal(0);
      })
      .finally(() => setLoading(false)); // <- now works
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/loader.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl text-primary font-bold mb-4">All Recent Activities</h1>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table-auto w-full min-w-[700px]">
          <thead className="secondary-bg">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Action</th>
              <th className="px-4 py-3 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a, idx) => (
              <tr key={idx} className="border-b transition-colors hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="px-4 py-3">{(page - 1) * limit + idx + 1}</td>

                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={a.photo || "/Avatar.jpeg"}
                    alt="User"
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                  <span className="font-medium">{a.user}</span>
                </td>

                <td className="px-4 py-3">{a.action}</td>
                <td className="px-4 py-3">{new Date(a.time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-4 justify-center flex-wrap">
        <button
          className="btn btn-sm btn-outline"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => {
          const pageNum = i + 1;

          if (
            pageNum === 1 ||
            pageNum === totalPages ||
            (pageNum >= page - 2 && pageNum <= page + 2)
          ) {
            return (
              <button
                key={pageNum}
                className={`btn btn-sm ${page === pageNum ? "btn-primary" : "btn-outline"}`}
                onClick={() => setPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          }

          if ((pageNum === page - 3 && pageNum > 1) || (pageNum === page + 3 && pageNum < totalPages)) {
            return (
              <span key={pageNum} className="px-2 py-1">
                ...
              </span>
            );
          }

          return null;
        })}

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

export default ActivityPage;
