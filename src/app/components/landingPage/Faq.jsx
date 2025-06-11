"use client";

import { faqs } from "@/app/content/data";
import { useState } from "react";

function Faq() {
  

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className=" flex flex-col items-center text-center px-4 pt-12 md:py-20 text-gray-800">
      {/* Header */}
      <div className="max-w-3xl space-y-4 md:space-y-6 ">
        <h1 className="text-2xl md:text-3xl font-bold text-black">Frequently Asked Questions</h1>
        <p className="text-gray-500 text-base md:text-lg">
          The key to creating an effective FAQ is to anticipate your users' questions and provide clear, concise answers.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="w-full max-w-3xl mt-8 space-y-4">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="bg-[#F4F7FA] rounded-lg p-4 cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex justify-between items-center text-left">
              <h3 className="font-semibold text-base md:text-lg">{item.question}</h3>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 text-gray-600 text-sm md:text-base ${
                activeIndex === index ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Faq;
