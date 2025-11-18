import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const FoodDetails = () => {
  const { user } = useAuth(); // logged-in user
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [requestLocation, setRequestLocation] = useState("");
  const [requestReason, setRequestReason] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [requests, setRequests] = useState([]);

  // Fetch food details
  useEffect(() => {
    fetch(`http://localhost:3000/foods/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching food details:", err);
        setLoading(false);
      });
  }, [id]);

  // Fetch requests
  useEffect(() => {
    fetch(`http://localhost:3000/foodRequests?foodId=${id}`)
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error("Error fetching requests:", err));
  }, [id]);

  // Submit a new request
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return toast.error("You must be logged in to request food.");
    }
    if (!requestLocation || !requestReason || !contactNo) {
      return toast.error("Please fill in all fields.");
    }

    const requestData = {
      foodId: food._id,
      foodName: food.food_name,
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,
      requestLocation,
      requestReason,
      contactNo,
      status: "pending",
      createdAt: new Date(),
    };

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:3000/foodRequests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      const result = await res.json();
      toast.success("Request submitted successfully!");
      setModalOpen(false);

      // Reset form
      setRequestLocation("");
      setRequestReason("");
      setContactNo("");

      // Add new request to state
      setRequests((prev) => [...prev, result]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit request.");
    } finally {
      setSubmitting(false);
    }
  };

  // Accept or Reject request
  const handleRequestAction = async (requestId, action) => {
    try {
      // Update request status
      await fetch(`http://localhost:3000/foodRequests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action }),
      });

      // If accepted, also update the food status
      if (action === "accepted") {
        await fetch(`http://localhost:3000/foodRequests/${food._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ actions: "donated" }),
        });
        setFood((prev) => ({ ...prev, food_status: "donated" }));

        // Optional: Automatically reject all other pending requests
        setRequests((prev) =>
          prev.map((req) =>
            req._id === requestId
              ? { ...req, status: "accepted" }
              : req.status === "pending"
              ? { ...req, status: "rejected" }
              : req
          )
        );
      } else {
        // For rejection, only update this request
        setRequests((prev) =>
          prev.map((req) =>
            req._id === requestId ? { ...req, status: "rejected" } : req
          )
        );
      }

      toast.success(`Request ${action} successfully!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update request.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700 text-lg">Loading food details...</p>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700 text-lg">Food not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Toaster position="top-right" />
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <img
          src={food.food_image}
          alt={food.food_name}
          className="w-full h-80 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-primary mb-4">
            {food.food_name}
          </h1>

          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Quantity:</span> {food.food_quantity}
          </p>

          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Pickup Location:</span> {food.pickup_location}
          </p>

          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Expiry Date:</span> {food.expire_date}
          </p>

          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Additional Notes:</span>{" "}
            {food.additional_notes || "None"}
          </p>

          <div className="flex items-center mb-4">
            <img
              src={food.donator_image}
              alt={food.donator_name}
              className="w-12 h-12 rounded-full mr-4 object-cover"
            />
            <div>
              <p className="text-gray-800 font-semibold">{food.donator_name}</p>
              <p className="text-gray-500 text-sm">{food.donator_email}</p>
            </div>
          </div>

          <p
            className={`font-semibold ${
              food.food_status === "Available" ? "text-green-600" : "text-red-600"
            }`}
          >
            Status: {food.food_status}
          </p>

          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-primary mt-6 w-full"
          >
            Request Food
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Request Food</h2>
            <form onSubmit={handleRequestSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Write Location"
                value={requestLocation}
                onChange={(e) => setRequestLocation(e.target.value)}
                required
                className="input"
              />
              <textarea
                placeholder="Why Need Food"
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
                required
                className="textarea"
              />
              <input
                type="text"
                placeholder="Contact No."
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                required
                className="input"
              />
              <button
                type="submit"
                className={`btn btn-primary mt-2 ${
                  submitting ? "btn-disabled" : ""
                }`}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Requester data */}
      {requests.length > 0 && (
        <div className="overflow-x-auto mt-8">
          <h2 className="text-2xl font-bold mb-4">Requests for this food</h2>
          <table className="table w-full">
            <thead>
              <tr>
                <th>SL No</th>
                <th>Requester</th>
                <th>Location</th>
                <th>Reason</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={
                              req.userPhoto ||
                              "https://img.daisyui.com/images/profile/demo/2@94.webp"
                            }
                            alt={req.userName}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{req.userName}</div>
                        <div className="text-sm opacity-50">{req.userEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td>{req.requestLocation}</td>
                  <td>{req.requestReason}</td>
                  <td>{req.contactNo}</td>
                  <td>
                    <span
                      className={
                        req.status === "pending"
                          ? "text-yellow-600 font-semibold"
                          : req.status === "accepted"
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleRequestAction(req._id, "accepted")}
                      disabled={
                        req.status !== "pending" || food.food_status !== "Available"
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleRequestAction(req._id, "rejected")}
                      disabled={req.status !== "pending"}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
