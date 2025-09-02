// import { roadmapItems } from "@/content/data";
// import { MdOutlineSecurity } from "react-icons/md";

// export default function Roadmap() {
//   return (
//     <div id="roadmap" className="relative px-4 py-20 bg-gray-50 flex flex-col items-center overflow-hidden">
//       <div className="max-w-3xl mb-16 text-center space-y-4">
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
//           ROADMAP - Our Vision for the Future
//         </h1>
//         <p className="text-gray-600 text-lg">
//           Our roadmap defines our vision to innovate, empower individuals, and create a sustainable, decentralized ecosystem for a brighter future.
//         </p>
//       </div>

//       {/* CONTAINER for LINE + CARDS */}
//       <div className="relative w-full max-w-5xl">

//         {/* Vertical Line limited to the roadmap section only */}
//         <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-300 z-0" />

//         <div className="relative space-y-16">
//           {roadmapItems.map((item, index) => (
//             <div
//               key={index}
//               className={`relative flex ${
//                 index % 2 === 0 ? "md:justify-end" : "md:justify-start"
//               }`}
//             >
//               <div
//                 className={`relative z-10 bg-gradient-to-r ${item.color} p-6 rounded-xl shadow-xl w-full max-w-md text-white transition-transform duration-300 hover:scale-105
//                 ${index % 2 === 0 ? "md:mr-4" : "md:ml-4"}
//                 ml-14 md:ml-0
//                 `}
//               >
//                 <h2 className="text-2xl font-semibold">{item.quarter}</h2>
//                 <p className="mt-3 text-base">{item.text}</p>
//                 <div className="mt-5 w-12 h-12 rounded-full bg-white flex items-center justify-center">
//                   <MdOutlineSecurity className="text-2xl text-gray-900" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }












import { MdOutlineSecurity } from "react-icons/md";

function Roadmap() {
  return (
    <>
      <div id="roadmap" className="relative bg-white flex flex-col items-center pt-20 text-center px-4 md:px-10 lg:px-20 w-full">
        <div className="z-10 flex flex-col items-center w-full max-w-2xl space-y-4 md:space-y-6">
          <h1 className="text-3xl font-semibold text-black">
            ROADMAP - Our Vision for the Future
          </h1>
          <h2 className="text-sm text-gray-600 font-extralight">
            Our roadmap defines our vision to innovate, empower individuals, and create a sustainable, decentralized ecosystem for a brighter future.
          </h2>
        </div>

        <div className="flex items-center justify-center mr-10 w-full mt-8">
          <ul className="timeline w-full max-w-4xl">
            {/* First Item */}
            <li className="flex flex-col items-center md:flex-row">
              <div className="timeline-start text-start max-w-60 w-full md:w-auto">
                <div className="card h-68 shadow-sm bg-gradient-to-r from-[#2F70B0] via-[#1F88B5] to-[#0EA2BB]">
                  <div className="card-body">
                    <h2 className="text-white text-2xl">Q1 2025</h2>
                    <p className="text-white mt-2 text-md">
                      Launch AGUA on major exchanges & integrate with wallets.
                    </p>
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1A2335]">
                      <MdOutlineSecurity className="text-white text-3xl" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="timeline-middle flex items-center">
                <div className="w-3 h-3 bg-[#0EA2BB] rounded-full"></div>
              </div>
              <hr className="bg-[#D6E5FF] w-full" />
            </li>

            {/* Second Item */}
            <li className="flex flex-col items-center md:flex-row">
              <hr className="bg-[#D6E5FF] w-full" />
              <div className="timeline-start text-start max-w-60 w-full md:w-auto">
                <div className="card bg-gradient-to-r from-[#2F70B0] via-[#1F88B5] to-[#0EA2BB] h-68 shadow-sm">
                  <div className="card-body">
                    <h2 className="text-white text-2xl">Q2 2025</h2>
                    <p className="text-white mt-2 text-md">
                      Expand mining partnerships & implement DAO voting.
                    </p>
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1A2335]">
                      <MdOutlineSecurity className="text-white text-3xl" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="timeline-middle flex items-center">
                <div className="w-3 h-3 bg-[#0EA2BB] rounded-full"></div>
              </div>
              <hr className="bg-[#D6E5FF] w-full" />
            </li>

            {/* Third Item */}
            <li className="flex flex-col items-center md:flex-row">
              <hr className="bg-[#D6E5FF] w-full" />
              <div className="timeline-start text-start w-full max-w-60 md:w-auto">
                <div className="card bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 h-68 shadow-sm">
                  <div className="card-body">
                    <h2 className="text-white text-2xl">Q3 2025</h2>
                    <p className="text-white mt-2 text-md">
                      Develop cross-border payments & real-world adoption initiatives.
                    </p>
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1A2335]">
                      <MdOutlineSecurity className="text-white text-3xl" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="timeline-middle flex items-center">
                <div className="w-3 h-3 bg-[#D9A522] rounded-full"></div>
              </div>
              <hr className="bg-[#D6E5FF] w-full" />
            </li>

            <li className="flex flex-col items-center md:flex-row">
              <hr className="bg-[#D6E5FF] w-full" />
              <div className="timeline-start text-start w-full max-w-60 md:w-auto">
                <div className="card bg-[#000B1F] h-68 shadow-sm">
                  <div className="card-body">
                    <h2 className="text-white text-2xl">Q4 2025</h2>
                    <p className="text-white mt-2 text-md">
                     Full on-chain proof-of-reserves & NFT-backed silver/gold certificates.
                    </p>
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1A2335]">
                      <MdOutlineSecurity className="text-white text-3xl" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="timeline-middle flex items-center">
                <div className="w-3 h-3 bg-[#000B1F] rounded-full"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Roadmap;
