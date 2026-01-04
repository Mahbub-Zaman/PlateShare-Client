import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const AddFood = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [foodName, setFoodName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return toast.error("You must be logged in to add food.");
    if (!foodName.trim()) return toast.error("Please provide a food name.");
    if (!imageUrl.trim()) return toast.error("Please provide a food image URL (must use ImgBB).");
    if (!imageUrl.includes("https://i.ibb.co/") && !imageUrl.includes("https://ibb.co/")) {
      return toast.error("Image must be hosted on ImgBB!");
    }
    if (!quantity.trim()) return toast.error("Please provide food quantity.");
    if (!pickupLocation.trim()) return toast.error("Please provide pickup location.");
    if (!expireDate) return toast.error("Please select expire date.");

    setLoading(true);

    try {
      const foodData = {
        food_name: foodName,
        food_image: imageUrl,
        food_quantity: `Serves ${quantity} ${quantity === "1" ? "person" : "people"}`,
        pickup_location: pickupLocation,
        expire_date: expireDate,
        additional_notes: notes,
        donator_name: user.displayName,
        donator_email: user.email,
        donator_image: user.photoURL,
        food_status: "Available",
        createdAt: new Date(),
      };

      const response = await fetch("https://plateshare-api-server-beige.vercel.app/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(foodData),
      });

      const result = await response.json();
      console.log("MongoDB response:", result);

      toast.success("✅ Food added successfully!");
      setLoading(false);

      setFoodName("");
      setImageUrl("");
      setQuantity("");
      setPickupLocation("");
      setExpireDate("");
      setNotes("");

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add food. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start p-6">
      <Toaster position="top-right" />
      <div className="secondary-bg shadow-2xl rounded-3xl p-8 max-w-3xl w-full space-y-6">
        <h1 className="text-4xl font-bold text-center text-primary mb-4">Add New Food</h1>
        <p className="text-center text-gray-500 mb-6">
          Fill in the details to donate food and help others
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          {/* Food Name */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">Food Name</label>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="e.g. Spaghetti Bolognese"
              className="input input-bordered rounded-xl w-full p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">Food Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="ImgBB URL"
              className="input input-bordered rounded-xl w-full p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Food Preview"
                className="mt-2 h-32 w-full object-cover rounded-xl shadow"
              />
            )}
          </div>

          {/* Quantity */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Number of people it serves"
              className="input input-bordered rounded-xl w-full p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Pickup Location */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">Pickup Location</label>
            <input
              type="text"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              placeholder="e.g. 123 Main St, Dhaka"
              className="input input-bordered rounded-xl w-full p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Expire Date */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">Expire Date</label>
            <input
              type="date"
              value={expireDate}
              onChange={(e) => setExpireDate(e.target.value)}
              className="input input-bordered rounded-xl w-full p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Additional Notes */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-gray-700">Additional Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions or info"
              className="textarea textarea-bordered rounded-xl w-full p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`btn w-full rounded-xl text-white text-lg font-semibold py-3 ${
              loading ? "btn-disabled bg-gray-400" : "btn-primary"
            }`}
          >
            {loading ? "Adding..." : "Add Food"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
