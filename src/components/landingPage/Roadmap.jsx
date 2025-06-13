import { roadmapItems } from "@/content/data";
import { MdOutlineSecurity } from "react-icons/md";

export default function Roadmap() {
  return (
    <div className="relative px-4 py-20 bg-gray-50 flex flex-col items-center overflow-hidden">
      <div className="max-w-3xl mb-16 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          ROADMAP - Our Vision for the Future
        </h1>
        <p className="text-gray-600 text-lg">
          Our roadmap defines our vision to innovate, empower individuals, and create a sustainable, decentralized ecosystem for a brighter future.
        </p>
      </div>

      {/* CONTAINER for LINE + CARDS */}
      <div className="relative w-full max-w-5xl">

        {/* Vertical Line limited to the roadmap section only */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-300 z-0" />

        <div className="relative space-y-16">
          {roadmapItems.map((item, index) => (
            <div
              key={index}
              className={`relative flex ${
                index % 2 === 0 ? "md:justify-end" : "md:justify-start"
              }`}
            >
              <div
                className={`relative z-10 bg-gradient-to-r ${item.color} p-6 rounded-xl shadow-xl w-full max-w-md text-white transition-transform duration-300 hover:scale-105
                ${index % 2 === 0 ? "md:mr-4" : "md:ml-4"}
                ml-14 md:ml-0
                `}
              >
                <h2 className="text-2xl font-semibold">{item.quarter}</h2>
                <p className="mt-3 text-base">{item.text}</p>
                <div className="mt-5 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <MdOutlineSecurity className="text-2xl text-gray-900" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
