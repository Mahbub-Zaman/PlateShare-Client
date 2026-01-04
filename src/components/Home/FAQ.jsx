import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { NavLink } from "react-router-dom";


const FAQ = () => {
  const faqs = [
    { q: "How can I donate food?", a: "You can donate food by creating an account and adding food under Donate Food." },
    { q: "Is it free to use?", a: "Yes, Plateshare is completely free for users and donors." },
    { q: "Can I volunteer?", a: "Absolutely! Contact us to join as a volunteer in your area." },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-16 primary-bg">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-500 mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 cursor-pointer secondary-bg transition"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{faq.q}</h3>
                {openIndex === i ? <FiMinus /> : <FiPlus />}
              </div>
              {openIndex === i && <p className="description mt-2">{faq.a}</p>}
            </div>
          ))}
        </div>
        <div className="mt-6">
        <NavLink
            to="/faq"
            className="inline-block px-6 py-2 btn-primary rounded-lg transition"
        >
            Learn More
        </NavLink>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
