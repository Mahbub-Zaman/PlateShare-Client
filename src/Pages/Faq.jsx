import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Faq = () => {
  const faqs = [
    {
      question: "What is PlateShare?",
      answer:
        "PlateShare is a community-driven platform where users can donate surplus food and others can request it, helping reduce food waste."
    },
    {
      question: "How do I donate food?",
      answer:
        "Simply create an account, upload details about your available food, and publish your listing for others to see."
    },
    {
      question: "Is using PlateShare free?",
      answer:
        "Yes! PlateShare is completely free for both donors and receivers."
    },
    {
      question: "How do I request a food item?",
      answer:
        "Browse available food posts near you, select the item you want, and send a request to the donor."
    },
    {
      question: "How do I upload a food image?",
      answer:
        "Go to https://imgbb.com/ create an account, then upload your image. Copy Direct image url and paste it into your food image url."
    },
    {
      question: "Why food image url shows error?",
      answer:
        "Upload image to imgbb, then copy the direct view link and paste the url. Your url must be like this https://i.ibb.co/ not https://i.ibb.co.com/"
    },
  ];

  const renderAnswerWithLinks = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 font-medium underline hover:text-green-700"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};


  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="secondary-bg">
    <div className="max-w-4xl mx-auto px-4 py-22">
      <title>PlateShare | FAQ</title>

      <h1 className="text-4xl font-bold text-center mb-12">
        ❓ Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="primary-bg p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              {openIndex === index ? <FaChevronUp className="text-red-400" /> : <FaChevronDown className="text-green-500" />}
            </div>

            {openIndex === index && (
              <p className="mt-3 description">{renderAnswerWithLinks(faq.answer)}</p>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Faq;
