import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { FiLogIn, FiLogOut } from "react-icons/fi";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // Theme toggle state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  // Animated active & hover link class
  const navLinkClass = ({ isActive }) =>
    `relative px-1 py-1 font-medium transition-colors duration-300
    ${isActive ? "text-primary" : "black"}`;

  const links = [
    { to: "/", label: "Home" },
    { to: "/foods", label: "Available Foods" },
    { to: "/my-requests", label: "My Requests", auth: true },
    { to: "/dashboard", label: "Dashboard", auth: true },
    { to: "/about", label: "About" },
    { to: "/faq", label: "Faq" },
  ];

  return (
    <div className="navbar secondary-bg shadow-sm sticky top-0 z-50">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"/>
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
            {links.map(link =>
              (!link.auth || user) && (
                <li key={link.to}>
                  <NavLink to={link.to} className={navLinkClass}>
                    <span className="relative group">
                      {link.label}
                      <span
                        className={`absolute left-0 -bottom-1 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-full ${window.location.pathname === link.to ? 'w-full' : ''}`}
                      ></span>
                    </span>
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost flex items-center gap-2 text-xl text-primary">
          <img src="/plateshare.png" alt="Logo" className="w-8 h-8"/>
          PlateShare
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-4">
          {links.map(link =>
            (!link.auth || user) && (
              <li key={link.to} className="relative group">
                <NavLink to={link.to} className={navLinkClass}>
                  {link.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-primary transition-all duration-300 ${window.location.pathname === link.to ? 'w-full' : 'w-0'} group-hover:w-full`}
                  ></span>
                </NavLink>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`relative w-10 h-10 rounded-full overflow-hidden shadow-inner 
            ${theme === "light" ? "bg-white border border-gray-300 shadow-sm" : "bg-gray-700"}
            transition-colors duration-500 mr-4`}
          title="Toggle Light/Dark"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="/light.png" alt="Light Theme" className={`transition-transform duration-500 ${theme === "light" ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} w-6 h-6`} />
            <img src="/dark.png" alt="Dark Theme" className={`absolute transition-transform duration-500 ${theme === "dark" ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"} w-6 h-6`} />
          </div>
        </button>

        {/* Auth Buttons */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-purple-500 ring-offset-base-100 ring-offset-2">
                <img alt="User Avatar" src={user.photoURL || "./Avatar.jpeg"} title={user.displayName || user.email} />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content secondary-bg rounded-box z-50 mt-3 w-64 p-2 shadow-lg">
              <div className="flex flex-col gap-1 ml-2 px-2 py-2">
                <span className="font-bold text-base">{user.displayName || 'User'}</span>
                <span className="text-xs text-gray-600">{user.email}</span>
              </div>
              <div className="divider my-0"></div>
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
              <li><NavLink to="/dashboard/profile">My Profile</NavLink></li>
              <li><NavLink to="/dashboard/update-profile">Update Profile</NavLink></li>
              <div className="divider my-0"></div>
              <button onClick={handleLogout} className="btn btn-error btn-sm mt-1 ml-2 h-8 w-auto text-[15px] px-4 flex items-center gap-2">
                <FiLogOut /> Logout
              </button>
            </ul>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary btn-sm ml-2 h-10 w-auto text-[15px] px-4 flex items-center gap-2">
              <FiLogIn /> Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
