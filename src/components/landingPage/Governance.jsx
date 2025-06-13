"use client";

import { governancefeatures } from "@/content/data";



export default function Governance() {
  return (
    <section className="relative flex flex-col items-center py-16 px-4 md:px-10 lg:px-24 bg-white">
      <div className="max-w-3xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">DAO GOVERNANCE - Community-Driven Future</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full max-w-6xl">
        {governancefeatures.map((item, index) => (
          <div
            key={index}
            className="bg-[#F4F7FA] rounded-xl shadow hover:shadow-lg p-6 space-y-4 transition"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#000B1F]">
              {item.icon}
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
