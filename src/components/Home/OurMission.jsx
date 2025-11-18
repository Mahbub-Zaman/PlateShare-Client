import React from 'react';

const OurMission = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-16">
        <div className="max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-green-500 mb-6">Our Mission</h1>{/* */}
        <p className="text-lg text-gray-700 leading-relaxed mb-10">
        At <span className="font-semibold text-green-500">PlateShare</span>, our mission is to reduce food
        waste and strengthen community bonds by making it easy for people to
        share extra food with others. We believe that no meal should be
        thrown away when someone nearby may need it. Through simple
        technology and collective goodwill, we aim to promote sustainability,
        encourage generosity, and create a world where sharing food is a
        natural part of everyday life.
        </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mt-10 w-full">
        <div className="bg-white shadow-md rounded-2xl p-8 text-center hover:shadow-lg transition">
        <h3 className="text-3xl font-bold text-green-500 mb-4">1,200+</h3>
        <p className="text-gray-600">Food Items Shared</p>
        </div>


        <div className="bg-white shadow-md rounded-2xl p-8 text-center hover:shadow-lg transition">
        <h3 className="text-3xl font-bold text-green-500 mb-4">350+</h3>
        <p className="text-gray-600">Active Donors</p>
        </div>


        <div className="bg-white shadow-md rounded-2xl p-8 text-center hover:shadow-lg transition">
        <h3 className="text-3xl font-bold text-green-500 mb-4">820 kg</h3>
        <p className="text-gray-600">Food Saved From Waste</p>
        </div>
        </div>


        <div className="max-w-3xl mt-16 text-center">
        <p className="text-lg text-gray-700 leading-relaxed">
        Together, we are building a sustainable future—one shared plate at a
        time. PlateShare isn’t just a platform; it’s a movement towards
        kindness, responsibility, and community support.
        </p>
        </div>
        </div>
    );
};

export default OurMission;