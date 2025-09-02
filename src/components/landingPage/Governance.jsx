// "use client";

// import { governancefeatures } from "@/content/data";



// export default function Governance() {
//   return (
//     <section id="dao" className="relative flex flex-col items-center py-16 px-4 md:px-10 lg:px-24 bg-white">
//       <div className="max-w-3xl text-center">
//         <h1 className="text-3xl md:text-4xl font-bold text-gray-900">DAO GOVERNANCE - Community-Driven Future</h1>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full max-w-6xl">
//         {governancefeatures.map((item, index) => (
//           <div
//             key={index}
//             className="bg-[#F4F7FA] rounded-xl shadow hover:shadow-lg p-6 space-y-4 transition"
//           >
//             <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#000B1F]">
//               {item.icon}
//             </div>
//             <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
//             <p className="text-gray-500 text-sm">{item.desc}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }










import { MdOutlineSecurity } from "react-icons/md";
import { GiVote } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";

function Governance() {
  return (
    <>
      <div id="dao" className="relative bg-white flex flex-col pt-16 px-4 md:px-10 lg:px-24">
        {/* Responsive Heading Section */}
        <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
          <h1 className="text-3xl font-semibold text-black">
            DAO GOVERNANCE - Community-Driven Future
          </h1>
        </div>

        {/* Responsive Cards */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8">
          <div className="card w-40 md:w-52 lg:w-64 xl:w-80 bg-[#F4F7FA] card-xs md:card-sm shadow-sm">
            <div className="card-body">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#000B1F]">
                <MdOutlineSecurity className="text-white text-2xl" />
              </div>
              <h2 className="card-title text-black">Decentralized Autonomous Organization</h2>
              <p className="text-start text-gray-500">
                AGUA holders have the power to influence decisions within the DAO, ensuring a community-driven approach.
              </p>
            </div>
          </div>

          <div className="card w-40 md:w-52 lg:w-64 xl:w-80 bg-[#F4F7FA] card-xs md:card-sm shadow-sm">
            <div className="card-body">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#000B1F]">
                <GiVote className="text-white text-2xl" />
              </div>
              <h2 className="card-title text-black">Transparent Voting</h2>
              <p className="text-start text-gray-500">
                Reserves strategies, protocol upgrades and treasury management decided by the community.
              </p>
            </div>
          </div>

          <div className="card w-40 md:w-52 lg:w-64 xl:w-80 bg-[#F4F7FA] card-xs md:card-sm shadow-sm">
            <div className="card-body">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#000B1F]">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h2 className="card-title text-black">Power to the People</h2>
              <p className="text-start text-gray-500">
                A financial system where individuals have full control, free from banks and intermediaries ensuring fairness, transparency, and equal opportunity for all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Governance;
