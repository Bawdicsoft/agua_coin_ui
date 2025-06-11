
"use client";

import { coreIntroductionParagraph, coreIntroductionfeatures, tableData, whatIsAgua } from "@/app/content/data";





export default function CoreIntroduction() {
  return (
    <div className="relative mt-20  lg:px-20 overflow-hidden">
      <div className="relative z-10 flex flex-col text-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {/* Left Side */}
          <div className="flex flex-col justify-center px-6 sm:px-10  rounded-lg w-full">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 font-poppins text-gray-800">
              {whatIsAgua}
            </h2>

            <p className="text-base w-full sm:text-lg text-gray-600 leading-relaxed mb-8 shadow-md p-4 rounded-lg bg-white border border-gray-200">
                {coreIntroductionParagraph}
            </p>

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"> */}
              <div className="space-y-4 mt-4 lg:w-5/6 flex lg:flex-col flex-wrap justify-center items-center lg:items-start">
              {coreIntroductionfeatures.map((item, i) => (
                <div
                  key={i}
                  className="bg-white text-black shadow border border-gray-300 w-full p-5 rounded-lg transition duration-300 hover:shadow-lg"
                >
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-500 font-light text-md mt-2">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center gap-8 lg:items-start w-full h-full">
            <div className="w-full flex justify-center items-center ">
              <img
                src="/agua-pic1.png"
                alt="AGUA"
                className="w-full h-auto max-w-xs lg:max-w-md object-contain"
              />
            </div>

            <div className="overflow-x-auto w-full rounded-box border-[16px] border-[#F4F7FA] bg-base-100">
              <table className="min-w-full divide-y divide-gray-300 rounded-lg overflow-hidden shadow-md">
                <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                  <tr>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Inflation</th>
                    <th className="px-4 py-3 text-left">Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {tableData.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-medium">{row.type}</td>
                      <td className="px-4 py-3">{row.inflation}</td>
                      <td className="px-4 py-3">{row.control}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
