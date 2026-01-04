import React from "react";

const Blogs = () => {
  const articles = [
    { title: "How to Donate Food Safely", date: "Jan 10, 2026", link: "#" },
    { title: "10 Ways to Reduce Food Waste", date: "Feb 5, 2026", link: "#" },
    { title: "Volunteer Stories & Impact", date: "Mar 1, 2026", link: "#" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Our Blog</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((a, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-6 hover:scale-105 transform transition"
            >
              <h3 className="text-xl font-semibold mb-2">{a.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{a.date}</p>
              <a
                href={a.link}
                className="text-green-500 font-semibold hover:underline"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
