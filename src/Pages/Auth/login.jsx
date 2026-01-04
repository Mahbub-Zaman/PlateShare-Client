import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserShield, FaUser } from "react-icons/fa"; // added icons
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signInUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Demo credentials
  const demoCredentials = {
    admin: { email: "admin@plateshare.com", password: "admin123" },
    user: { email: "sam123@gmail.com", password: "iGwHmCL!WXhg2pS" },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInUser(email, password);
      toast.success("✅ Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const handleDemoLogin = async (type) => {
    const { email, password } = demoCredentials[type];
    setEmail(email);
    setPassword(password);

    try {
      await signInUser(email, password);
      toast.success(`${type === "admin" ? "Admin" : "Demo User"} logged in!`);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Login failed, please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const userData = {
        name: user.displayName || "User",
        email: user.email,
        photoURL: user.photoURL || "",
        role: "user",
        createdAt: new Date(),
      };

      const res = await fetch("https://plateshare-api-server-beige.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      await res.json();

      toast.success("✅ Logged in successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("❌ Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <title>Plateshare | Login</title>
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="text-4xl font-bold text-primary mb-4 text-center">Welcome Back!</h1>

      {/* Demo Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          type="button"
          onClick={() => handleDemoLogin("admin")}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
        >
          <FaUserShield /> Admin
        </button>
        <button
          type="button"
          onClick={() => handleDemoLogin("user")}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
        >
          <FaUser /> Demo User
        </button>
      </div>

      <form onSubmit={handleLogin} className="bg-white shadow-md rounded-lg p-8 w-96">
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

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 pr-20 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2.5 right-2 px-2 py-1 bg-gray-100 rounded text-gray-600 hover:bg-gray-200 transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="mb-4 text-right">
          <Link to="/forgot-password" className="text-green-600 text-sm hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full btn-primary text-white font-semibold py-2 rounded-md transition-colors duration-300"
        >
          Login
        </button>

        <h3 className="text-center font-semibold mt-4 text-primary">or</h3>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn bg-white text-black border w-full flex items-center justify-center py-2 mt-2 gap-2"
        >
          <FcGoogle className="text-xl" /> Sign in with Google
        </button>
      </form>

      <div className="bg-white shadow-md rounded-lg p-4 w-96 mt-2 flex justify-center">
        <h3>
          New Here?{" "}
          <Link to="/signup" className="text-primary underline">
            Create an account
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Login;
