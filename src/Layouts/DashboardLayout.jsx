import { TbBrowserMaximize, TbWindowMinimize } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import toast from "react-hot-toast";

import { FiLogIn, FiLogOut } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";
import { PiBowlFood } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineManageAccounts } from "react-icons/md";
import { LuUtensils } from "react-icons/lu";
import { AiOutlineBarChart } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa";
import { TfiList } from "react-icons/tfi";
import { HiOutlineUsers } from "react-icons/hi2";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const { role, loading: roleLoading } = useUserRole(); // fetch role from backend
  const isAdmin = role === "Admin";

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="flex h-screen primary-bg">
      {/* Sidebar */}
      <div
        className={`flex flex-col secondary-bg border-r border-gray-300 transition-all duration-300 ${
          collapsed ? "w-16" : "w-50"
        }`}
      >
        <NavLink to="/">
          <div className="mt-1 flex gap-2 border-b p-1 border-gray-400">
            <img src="/plateshare.png" className="h-12 w-12 mb-1" />
            {!collapsed && (
              <div>
                <p className="text-xl text-green-500 font-semibold">Plateshare</p>
                <p className="text-[12px] description">Food Donation Platform</p>
              </div>
            )}
          </div>
        </NavLink>

        <ul className="menu w-full mt-2 flex-1 p-2 gap-2">
          <li>
            <NavLink className="flex items-center gap-2" to="/dashboard">
              <GoHome className="w-5 h-5" />
              {!collapsed && <span>Homepage</span>}
            </NavLink>
          </li>

          {/* <li>
            <NavLink className="flex items-center gap-2" to="/dashboard/test">
              <GoHome className="w-5 h-5" />
              {!collapsed && <span>Testing Page</span>}
            </NavLink>
          </li> */}

          <li>
            <NavLink className="flex items-center gap-2" to="/dashboard/add-food">
              <IoMdAddCircleOutline className="w-5 h-5" />
              {!collapsed && <span>Post Food</span>}
            </NavLink>
          </li>

          <li>
            <NavLink className="flex items-center gap-2" to="/foods">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
                />
              </svg>
              {!collapsed && <span>Browse Food</span>}
            </NavLink>
          </li>

          <li>
            <NavLink className="flex items-center gap-2" to="/dashboard/manage-food">
              <FaRegHeart className="w-5 h-5" />
              {!collapsed && <span>My Donations</span>}
            </NavLink>
          </li>

          <li>
            <NavLink className="flex items-center gap-2" to="/dashboard/req-food">
              <PiBowlFood className="w-5 h-5" />
              {!collapsed && <span>Food Requests</span>}
            </NavLink>
          </li>


          <li>
            <NavLink className="flex items-center gap-2" to="/dashboard/my-requests">
              <TfiList className="w-5 h-5" />
              {!collapsed && <span>My Requests</span>}
            </NavLink>
          </li>

          {/* Admin section only after role is loaded */}
          {!roleLoading && isAdmin && (
            <>
            <li className="menu-title mt-2">
              {!collapsed && (
                <span className="flex items-center gap-2 text-xs text-gray-500 uppercase">
                  <MdOutlineManageAccounts className="w-4 h-4" />
                  Admin Panel
                </span>
              )}
            </li>
          <li>
            <NavLink className="flex items-center gap-2" to="/dashboard/stats">
              <AiOutlineBarChart className="w-5 h-5" />
              {!collapsed && <span>Analytics</span>}
            </NavLink>
          </li>

          <li>
            <NavLink className="flex items-center gap-2" to="/dashboard/manage-users">
              <HiOutlineUsers className="w-5 h-5" />
              {!collapsed && <span>Manage Users</span>}
            </NavLink>
          </li>

          <li>
            <NavLink className="flex items-center gap-2" to="/dashboard/manage-foods">
              <LuUtensils className="w-5 h-5" />
              {!collapsed && <span>Manage Foods</span>}
            </NavLink>
          </li>

          <li>
            <NavLink className="flex items-center gap-2" to="/dashboard/activity">
              <FaRegClock className="w-5 h-5" />
              {!collapsed && <span>All Activity</span>}
            </NavLink>
          </li>
            </>
          )}
          <li>
            <NavLink className="flex items-center gap-2" to="/dashboard/profile">
              <CgProfile className="w-5 h-5" />
              {!collapsed && <span>Profile</span>}
            </NavLink>
          </li>
        </ul>

        {/* Collapse/Expand button */}
        <div className="p-2 border-t bg-[#90c09d] flex justify-center">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-10 h-10 flex items-center justify-center rounded hover:bg-gray-700 hover:text-white transition-all duration-300 relative"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <span
              className={`text-2xl transition-all duration-500 ${
                collapsed ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 rotate-90 absolute"
              }`}
            >
              <TbBrowserMaximize />
            </span>
            <span
              className={`text-3xl transition-all duration-500 absolute ${
                collapsed ? "opacity-0 scale-0 -rotate-90" : "opacity-100 scale-100 rotate-0"
              }`}
            >
              <TbWindowMinimize />
            </span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="navbar secondary-bg px-4 flex justify-between">
          <div className="text-2xl font-bold">Dashboard</div>

          <div className="flex gap-1 items-center hidden sm:flex">
            <p className="text-gray-600">Welcome back,</p>
            <p className="font-semibold text-green-400">{user.displayName || "User"}</p>
          </div>

          {/* Right buttons */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`relative w-10 h-10 rounded-full overflow-hidden shadow-inner ${
                theme === "light" ? "bg-white border border-gray-300" : "bg-gray-700"
              }`}
              title="Toggle Light/Dark"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/light.png"
                  alt="Light Theme"
                  className={`transition-transform duration-500 ${
                    theme === "light" ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  } w-6 h-6`}
                />
                <img
                  src="/dark.png"
                  alt="Dark Theme"
                  className={`absolute transition-transform duration-500 ${
                    theme === "dark" ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
                  } w-6 h-6`}
                />
              </div>
            </button>

            {/* User dropdown */}
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full ring ring-purple-500 ring-offset-base-100 ring-offset-2">
                    <img src={user.photoURL || "/Avatar.jpeg"} alt="User Avatar" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-200 rounded-box mt-3 w-64 p-2 shadow-lg"
                >
                  <li className="menu-title px-2 py-2">
                    <span className="font-bold">{user.displayName || "User"}</span>
                    <span className="text-xs text-gray-600">{user.email}</span>
                  </li>
                  <div className="divider my-0"></div>
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/profile">My Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/update-profile">Update profile</NavLink>
                  </li>
                  <div className="divider my-0"></div>
                  <li>
                    <button
                      className="btn btn-error btn-sm w-full flex items-center justify-center gap-2"
                      onClick={handleLogout}
                    >
                      <FiLogOut /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <button className="btn btn-primary btn-sm flex items-center gap-2">
                  <FiLogIn /> Login
                </button>
              </Link>
            )}
          </div>
        </nav>

        {/* Page content */}
        <div className="p-4 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
