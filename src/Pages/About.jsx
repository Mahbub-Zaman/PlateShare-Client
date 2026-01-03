import React from "react";
import {
  FaHeart,
  FaLeaf,
  FaUsers,
  FaRecycle,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiExpress } from "react-icons/si";
import AnimatedTimeline from "../components/AnimatedTimeline";

// Team data
const teamMembers = [
  { name: "Mahbub Zaman", role: "Founder & CEO", img: "https://i.ibb.co/7dST7bZQ/Gemini-Generated-Image-uhovv0uhovv0uhov.png" },
  { name: "Alex Anon", role: "Co-Founder & CTO", img: "https://i.ibb.co/Kpxwk6MP/pexels-ron-lach-9604304.jpg" },
  { name: "Bob Smith", role: "Community Manager", img: "https://i.ibb.co/v61pc8GQ/pexels-guillermo-berlin-1524368912-28893324.jpg" },
];

// Timeline data
const timeline = [
  { year: "2023", event: "PlateShare launched – 500 meals shared" },
  { year: "2024", event: "Reached 1,200 meals shared" },
  { year: "2025", event: "Expanded to 5 new cities" },
];

// Statistics data
const stats = [
  { title: "1,200+", description: "Meals Shared", icon: <FaRecycle className="text-4xl text-green-500 mb-2 mx-auto" /> },
  { title: "350+", description: "Active Donors", icon: <FaUsers className="text-4xl text-green-500 mb-2 mx-auto" /> },
  { title: "820 kg", description: "Food Saved", icon: <FaLeaf className="text-4xl text-green-500 mb-2 mx-auto" /> },
];

const About = () => {
  return (
    <div className="min-h-screen px-4 md:px-10 py-20 primary-bg">

      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-8">
        <h1 className="text-4xl font-bold mb-6 black">
          About <span className="text-primary">PlateShare</span>
        </h1>
        <p className="text-lg description leading-relaxed">
          PlateShare is a community-driven food sharing platform built to fight
          food waste, support sustainability, and bring people together through
          generosity.
        </p>
      </div>

      {/* Mission, Vision & Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
        <div className="card secondary-bg shadow-md p-8 text-center rounded-2xl hover:shadow-xl transition transform hover:-translate-y-1">
          <FaHeart className="text-4xl text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
          <p className="description">
            To reduce food waste by enabling people to share surplus food easily
            and responsibly within their local communities.
          </p>
        </div>

        <div className="card secondary-bg shadow-md p-8 text-center rounded-2xl hover:shadow-xl transition transform hover:-translate-y-1">
          <FaLeaf className="text-4xl text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
          <p className="description">
            A sustainable future where food is valued, shared, and never wasted.
          </p>
        </div>

        <div className="card secondary-bg shadow-md p-8 text-center rounded-2xl hover:shadow-xl transition transform hover:-translate-y-1">
          <FaUsers className="text-4xl text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-3">Community First</h3>
          <p className="description">
            PlateShare is built on trust, transparency, and the belief that
            communities grow stronger when people help each other.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="max-w-6xl mx-auto mb-24">
        <h2 className="text-3xl font-bold text-center mb-6 black">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-8 secondary-bg rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              {stat.icon}
              <h3 className="text-2xl font-bold mb-2">{stat.title}</h3>
              <p className="description">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <AnimatedTimeline timeline={timeline} />

      {/* Team Section */}
      <div className="max-w-6xl mx-auto mb-20 text-center">
        <h2 className="text-3xl font-bold mb-6 black">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="secondary-bg shadow-md rounded-2xl p-6 hover:shadow-xl transition transform hover:-translate-y-1">
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold black">{member.name}</h3>
              <p className="description">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="max-w-6xl mx-auto text-center mb-24">
        <h2 className="text-3xl font-bold mb-6 black">
          Technology Behind PlateShare
        </h2>
        <div className="flex flex-wrap justify-center gap-8 text-4xl">
          <FaReact className="text-sky-400" />
          <FaNodeJs className="text-green-500" />
          <SiExpress className="text-gray-500" />
          <SiMongodb className="text-green-600" />
          <SiTailwindcss className="text-cyan-400" />
        </div>
      </div>

      {/* Call To Action */}
      <div className="text-center max-w-4xl mx-auto mb-2">
        <h2 className="text-3xl font-bold mb-2 black">
          Be a Part of the Change
        </h2>
        <p className="description mb-6">
          Join PlateShare today and help reduce food waste while supporting your
          community.
        </p>
        <div className="flex justify-center gap-4">
          <button className="btn btn-primary">Explore Food</button>
          <button className="btn btn-outline">Donate Food</button>
        </div>
      </div>

    </div>
  );
};

export default About;
