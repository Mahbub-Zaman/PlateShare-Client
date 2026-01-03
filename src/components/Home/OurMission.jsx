import React from 'react';

const OurMission = () => {
    const statsData = [
  { title: "1,200+", paragraph: "Food Items Shared" },
  { title: "350+", paragraph: "Active Donors" },
  { title: "820 kg", paragraph: "Food Saved From Waste" }
];

    return (
        <div className="secondary-bg flex flex-col items-center px-6 py-16">
        <div className="max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-green-400 mb-2">Our Mission</h1>{/* */}
                    {/* Divider */}
      <hr className="w-26 mx-auto border-t-2 border-green-400 mb-8" />

        <p className="text-lg text-title leading-relaxed mb-2">
        At <span className="font-semibold text-green-400">PlateShare</span>, our mission is to reduce food
        waste and strengthen community bonds by making it easy for people to
        share extra food with others. We believe that no meal should be
        thrown away when someone nearby may need it. Through simple
        technology and collective goodwill, we aim to promote sustainability,
        encourage generosity, and create a world where sharing food is a
        natural part of everyday life.
        </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mt-8 w-full">
        {statsData.map((card, index) => (
            <div
            key={index}
            className={`primary-bg shadow-md rounded-2xl p-8 text-center hover:shadow-lg transition`}
            >
            <h3 className="text-3xl font-bold text-green-500 mb-4">{card.title}</h3>
            <p className="black">{card.paragraph}</p>
            </div>
        ))}
        </div>


        <div className="max-w-3xl mt-8 text-center">
        <p className="text-lg text-title leading-relaxed">
        Together, we are building a sustainable future—one shared plate at a
        time. PlateShare isn’t just a platform; it’s a movement towards
        kindness, responsibility, and community support.
        </p>
        </div>
        </div>
    );
};

export default OurMission;