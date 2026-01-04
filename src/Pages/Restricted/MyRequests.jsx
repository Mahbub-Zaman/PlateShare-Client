import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const loadData = async () => {
      try {
        const res = await fetch(
          `https://plateshare-api-server-beige.vercel.app/my-requests?email=${user.email}`
        );

        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error("Failed to fetch requests", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/loader.gif" alt="loader" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 primary-bg shadow rounded-2xl">
      <h2 className="text-2xl text-primary font-bold mb-6">My Requests</h2>

      {requests.length === 0 && (
        <p className="text-gray-500">No requests found.</p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border rounded-xl">
          <thead className="secondary-bg">
            <tr>
              <th className="p-3 text-left">Food</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Requested On</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-3">{item.foodName}</td>
                <td className="p-3">{item.requestedQuantity}</td>
                <td className="p-3">{item.requestLocation}</td>

                <td className="p-3 capitalize">
                  <span
                    className={`px-3 py-1 rounded-xl text-sm
                      ${
                        item.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : item.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-3">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRequests;
