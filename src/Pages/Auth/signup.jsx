import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password validation function
  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters long";
    if (!/[A-Z]/.test(password)) return "Password must include at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must include at least one lowercase letter";
    return "";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

 const handleRegister = async (e) => {
  e.preventDefault();
  const terms = e.target.terms.checked;

  if (passwordError) return;
  if (!terms) {
    setFormError("Please accept our terms and conditions");
    return;
  }

  setFormError("");
  setLoading(true);

  try {
    // 1️⃣ Create user in Firebase (no need to store return value if not needed)
    await createUser(email, password);

    // 2️⃣ Update Firebase profile
    await updateUserProfile({
      displayName: name || null,
      photoURL: photoURL || null,
    });

    // 3️⃣ Prepare data for MongoDB
    const userData = {
      name,
      email,
      photoURL,
      createdAt: new Date(),
    };

    // 4️⃣ Send data to MongoDB
    const response = await fetch("https://plateshare-api-server-beige.vercel.app/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log("MongoDB response:", data);

    toast.success("✅ Account created successfully! Welcome!");
    
    setLoading(false);

    // 5️⃣ Reset form
    e.target.reset();
    setName("");
    setEmail("");
    setPhotoURL("");
    setPassword("");
    setPasswordError("");

    navigate("/"); // redirect to Home page
  } catch (err) {
    console.error(err);
    setLoading(false);
    if (err.code === "auth/email-already-in-use") {
      setFormError("This email is already registered. Please login instead.");
    } else if (err.code === "auth/invalid-email") {
      setFormError("Invalid email address.");
    } else if (err.code === "auth/weak-password") {
      setFormError("Password is too weak.");
    } else {
      setFormError(err.message || "Failed to create account");
    }
  }
};


  const handleTogglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("✅ Signed in with Google successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <title>SkillSwap | Sign Up</title>
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-4xl font-bold mb-6 text-primary text-center">Create Your Account</h1>

      <form onSubmit={handleRegister} className="bg-white shadow-md rounded-lg p-8 w-96">
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Photo URL */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Photo URL</label>
          <input
            type="text"
            placeholder="Enter your photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Password */}
        <div className="mb-1">
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full border rounded-md p-2 pr-20 focus:outline-none focus:ring-2 ${
                passwordError ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-green-400"
              }`}
              required
            />
            <button
              type="button"
              onClick={handleTogglePasswordShow}
              className="absolute top-2.5 right-2 px-2 py-1 bg-gray-100 rounded text-gray-600 hover:bg-gray-200 transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>

        {/* Terms */}
        <div className="mb-4 flex items-center gap-2 mt-3">
          <input type="checkbox" name="terms" id="terms" className="checkbox" />
          <label htmlFor="terms" className="text-gray-700 text-sm">
            Accept our <span className="text-green-600 font-medium">terms and conditions</span>
          </label>
        </div>

        {/* Submit */}
        {formError && <p className="text-red-500 mb-2">{formError}</p>}
        <button
          type="submit"
          disabled={loading || passwordError}
          className={`w-full py-2 rounded-md font-semibold text-white transition-colors duration-300 ${
            loading || passwordError ? "bg-gray-400" : "btn-primary"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Google Login */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-2 border border-gray-300 rounded-md bg-white flex items-center justify-center gap-2 hover:bg-gray-100"
          >
            <FcGoogle className="text-xl" /> {/* Google icon */}
            Sign up with Google
          </button>
        </div>

        {/* Login link */}
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
