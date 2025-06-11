"use client";

import { FaArrowRight } from "react-icons/fa6";
import { partnershipfeatures, partnershipflow } from "@/app/content/data";

const Card = ({ icon, title, desc, color = "#1D2839" }) => (
  <div className="bg-[#0F1A2C] shadow-sm rounded-lg p-4 space-y-3 text-start min-w-[180px]">
    <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ backgroundColor: color }}>
      {icon}
    </div>
    <h3 className="font-semibold text-white">{title}</h3>
    <p className="text-gray-400 text-sm">{desc}</p>
  </div>
);

export default function Partnership() {
  return (
    <div className="relative bg-[#000B1F] flex flex-col items-center px-4 md:px-10 lg:px-20 pt-16 pb-12 text-center min-h-screen text-white">
      <div className="absolute right-0 -bottom-10 custom-radial-gradient-purpleWhiteSmall opacity-60 z-0" />

      <div className="z-10 max-w-3xl space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">MINING PARTNERSHIPS - Securing Real-World Value</h1>
        <p className="text-gray-400 text-sm md:text-base">
          AGUA isn't just backed by precious metals—it secures long-term reserves by partnering with global mining operations.
        </p>
      </div>

      <div className="z-10 flex flex-col md:flex-row gap-6 items-center mt-12 w-full max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {partnershipfeatures.map((item, i) => (
            <Card key={i} icon={item.icon} title={item.title} desc={item.desc} color={item.color} />
          ))}
        </div>
        <img className="w-full md:w-1/2 rounded-lg shadow-md object-contain mt-6 md:mt-0" src="/agua-pic3.png" alt="Mining" />
      </div>

      <div className="z-10 flex flex-wrap items-center justify-center gap-4 mt-10">
        {partnershipflow.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <Card icon={item.icon} title={item.title} desc={item.desc} />
            {i < partnershipflow.length - 1 && <FaArrowRight className="text-blue-500 hidden md:block" />}
          </div>
        ))}
      </div>
    </div>
  );
}
