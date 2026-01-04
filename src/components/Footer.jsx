import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal secondary-bg text-base-content p-10">
        {/* Company Info */}
        <aside className="flex flex-col ml-0 md:ml-12">
          <img
            src="/plateshare.png"
            alt="PlateShare Logo"
            className="w-14 h-14 mb-2"
          />
          <h2 className="text-2xl font-bold text-green-500">PlateShare</h2>
          <p className="mt-1 text-sm description">
            A MERN-based community platform <br />
            where users can share their surplus food to reduce waste. <br />
            It allows users to post available items and request food shared by
            others.
          </p>
        </aside>

        {/* Services */}
        <nav>
          <h6 className="footer-title">Services</h6>
          <NavLink to="/" className="link link-hover">
            Home
          </NavLink>
          <NavLink to="/foods" className="link link-hover">
            Available Food
          </NavLink>
          <NavLink to="/dashboard/add-food" className="link link-hover">
            Serve Food
          </NavLink>
          <NavLink to="/dashboard/manage-food" className="link link-hover">
            Manage My Food
          </NavLink>
        </nav>

        {/* Legal */}
        <nav>
          <h6 className="footer-title">Legal</h6>
          <NavLink to="/about" className="link link-hover">
            About Us
          </NavLink>
          <NavLink to="/faq" className="link link-hover">
            FAQ
          </NavLink>
          {/* <NavLink to="/cookies" className="link link-hover">
            Cookie policy
          </NavLink> */}
        </nav>

        {/* Social Links + Contact Info */}
        <nav>
          <h6 className="footer-title">Connect & Contact</h6>
          <div className="flex flex-col">
            <div className="mt-0 text-sm">
              <p>
                Email:{" "}
                <a href="mailto:info@plateshare.com" className="link link-hover">
                  mahbub.devx@gmail.com
                </a>
              </p>
              <p>Phone: +880 1739670124</p>
            </div>
            <div className="flex space-x-4 text-xl mt-4">
              {/* Social icons with hover brand colors */}
              <a
                href="https://www.facebook.com/IamMahbubZaman/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-[#1877F2]"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/mahbub_zaman_"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-[#08629b]"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://www.instagram.com/md_mahbub_zaman/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-[#C13584]"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/md-mahbub-zaman/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-[#0A66C2]"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </nav>
      </footer>

      <div className="w-full mt-0 secondary-bg">
        <hr className="border-gray-400" />
        <p className="text-center text-sm p-2 text-gray-500">
          &copy; {new Date().getFullYear()} All rights reserved by{" "}
          <span className="font-bold hover:text-[#1DA1F2]">MD Mahbub Zaman</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
