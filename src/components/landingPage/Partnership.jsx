"use client";

import { FaArrowRight } from "react-icons/fa6";
import { partnershipfeatures, partnershipflow } from "@/content/data";

const Card = ({ icon, title, desc, color = "#1D2839" }) => (
  <div className="bg-[#0F1A2C] shadow-sm rounded-lg p-4 space-y-3 text-start min-w-[180px] h-full flex flex-col">
    <div
      className="w-10 h-10 flex items-center justify-center rounded-full"
      style={{ backgroundColor: color }}
    >
      {icon}
    </div>
    <h3 className="font-semibold text-white">{title}</h3>
    <p className="text-gray-400 text-sm flex-grow">{desc}</p>
  </div>
);

export default function Partnership() {
  return (
    <div className="relative bg-[#000B1F] flex flex-col items-center px-4 md:px-10 lg:px-20 pt-16 pb-12 text-center min-h-screen text-white">
      <div className="absolute right-0 -bottom-10 custom-radial-gradient-purpleWhiteSmall opacity-60 z-0" />

      <div className="z-10 max-w-3xl space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          MINING PARTNERSHIPS - Securing Real-World Value
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          AGUA isn't just backed by precious metals—it secures long-term
          reserves by partnering with global mining operations.
        </p>
      </div>

      <div className="z-10 flex gap-4 lg:flex-row flex-col justify-center mt-12 w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-4 lg:w-1/3 w-full justify-between ">
          {partnershipfeatures.map((item, i) => (
            <Card
              key={i}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
              color={item.color}
            />
          ))}
        </div>
        <div className="lg:w-2/3 w-full ">
          <img
            className="rounded-lg shadow-md w-full  object-cover"
            src="/agua-pic3.png"
            alt="Mining"
          />
        </div>
      </div>

      <div className="z-10 flex flex-col w-full lg:flex-row items-center justify-between max-w-6xl gap-4 mt-16">
        {partnershipflow.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <Card icon={item.icon} title={item.title} desc={item.desc} />
             {i < partnershipflow.length - 1 && (
               <FaArrowRight className="text-blue-500 hidden md:block" />
             )}
          </div>
        ))}
      </div>
    </div>
  );
}
