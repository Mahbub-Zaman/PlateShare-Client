import React, { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { updateEmail, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // npm install react-hot-toast

const UpdateProfile = () => {
  const { user, updateUserProfile, auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update display name and photo
      await updateUserProfile({ displayName, photoURL });

      // Update email if changed
      if (email !== user.email) {
        await updateEmail(auth.currentUser, email);
      }

      // Update password if provided
      if (password) {
        await updatePassword(auth.currentUser, password);
      }

      toast.success("✅ Profile updated successfully!"); // Show toast
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      toast.error(err.message); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-8 mt-10 max-w-5xl mx-auto">
      <title>PlateShare | Update Profile</title>
      <Toaster position="top-right" reverseOrder={false} /> {/* Toast container */}

      {/* LEFT SIDE - Profile Preview */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3 text-center">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">
          Profile Preview
        </h2>
        <img
          src={photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto object-cover border-2 border-gray-200"
        />
        <h2 className="text-xl font-semibold mt-4">
          {displayName || "Your Name"}
        </h2>
        <p className="text-gray-500">{user?.email}</p>
        <p className="text-xs text-gray-400 mt-4">
          Member since:{" "}
          {user?.metadata?.creationTime
            ? new Date(user.metadata.creationTime).toDateString()
            : "N/A"}
        </p>
      </div>

      {/* RIGHT SIDE - Edit Form */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-2/3">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">
          Edit Profile
        </h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="px-3 py-2 border rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 border rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Photo URL
            </label>
            <input
              type="text"
              placeholder="Enter image URL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="px-3 py-2 border rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 border rounded w-full"
            />
          </div>

          {/* Submit Button with Spinner */}
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 flex justify-center items-center gap-2 transition"
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            )}
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
