import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { FiLogIn } from "react-icons/fi";
import { IoPersonAdd } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

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

    const links = <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/foods">Available Foods</NavLink></li>
            {/* {
                user && <>
                    <li><NavLink to="/myProducts">Add Food</NavLink></li>
                    <li><NavLink to="/myBids">Manage My Foods</NavLink></li>
                    <li><NavLink to="/createAProduct">My Food Requests</NavLink></li>
                </>
            } */}
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/faq">Faq</NavLink></li>
    </>

    return (
    <div className="navbar secondary-bg shadow-sm">
        <div className="navbar-start">
            <div className="dropdown">
        <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
        </div>
        <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
        >
            {links}
        </ul>
        </div>
        <Link to="/" className="btn btn-ghost flex items-center gap-2 text-xl text-primary">
        <img src="/plateshare.png" alt="Logo" className="w-8 h-8" />
        PlateShare
        </Link>

  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
        {links}
    </ul>
  </div>

  <div className="navbar-end flex">
        <button
        onClick={toggleTheme}
        className={`relative w-10 h-10 rounded-full overflow-hidden shadow-inner 
            ${theme === "light" ? "bg-white border border-gray-300 shadow-sm" : "bg-gray-700"}
            transition-colors duration-500 mr-4`}
        title="Toggle Light/Dark"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/light.png"
              alt="Light Theme"
              className={`transition-transform duration-500 ${
                theme === "light"
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              } w-6 h-6`}
            />
            <img
              src="/dark.png"
              alt="Dark Theme"
              className={`absolute transition-transform duration-500 ${
                theme === "dark"
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-6 opacity-0"
              } w-6 h-6`}
            />
          </div>
        </button>

    {user ? (
        <>
            {/* User Info Tooltip */}
            {/* <div className="hidden lg:flex flex-col items-end mr-3">
                <span className="text-sm font-semibold">{user.displayName || 'User'}</span>
                <span className="text-xs text-gray-500">{user.email}</span>
            </div> */}

            {/* User Avatar Dropdown */}
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full ring ring-purple-500 ring-offset-base-100 ring-offset-2">
                        <img
                            alt="User Avatar"
                            src={user.photoURL || "./Avatar.jpeg"}
                            title={user.displayName || user.email}
                        />
                    </div>
                </label>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-purple-100 rounded-box z-50 mt-3 w-64 p-2 shadow-lg"
                >
                    {/* User info in dropdown */}
                    <li className="menu-title">
                        <NavLink to="/profile">
                        <div className="flex flex-col gap-1 px-2 py-2">
                            <span className="font-bold text-base">{user.displayName || 'User'}</span>
                            <span className="text-xs text-gray-600">{user.email}</span>
                        </div>
                        </NavLink>
                    </li>
                    <div className="divider my-0"></div>
                    {/* <li>
                        <NavLink to="/profile">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            My Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/update-profile">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Update Profile
                        </NavLink>
                    </li> */}
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    <li><NavLink to="/add-food">Add Food</NavLink></li>
                    <li><NavLink to="/manage-food">Manage My Foods</NavLink></li>
                    <li><NavLink to="/req-food">My Food Requests</NavLink></li>
                <div className="divider my-0"></div>
            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="btn btn-error btn-sm mt-1 ml-2 h-8 w-auto text-[15px] px-4"
            >
                <FiLogOut />Logout
            </button>
                </ul>
            </div>

        </>
    ) : (
        <>
            {/* Login and Signup buttons when not logged in */}
            {/* <Link to="/signup">
                <button className="btn btn-outline btn-primary btn-sm h-10 w-auto text-[15px] px-4 flex items-center gap-2">
                    <IoPersonAdd />
                    <span className="hidden md:inline">Sign Up</span>
                </button>
            </Link> */}

            <Link to="/login">
                <button className="btn btn-primary btn-sm ml-2 h-10 w-auto text-[15px] px-4">
                    <FiLogIn />Login
                </button>
            </Link>
        </>
    )}
  </div>
</div>
    );
};

export default NavBar;