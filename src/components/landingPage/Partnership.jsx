// "use client";

// import { FaArrowRight } from "react-icons/fa6";
// import { partnershipfeatures, partnershipflow } from "@/content/data";

// const Card = ({ icon, title, desc, color = "#1D2839" }) => (
//   <div className="bg-[#0F1A2C] shadow-sm rounded-lg p-4 space-y-3 text-start min-w-[180px] h-full flex flex-col">
//     <div
//       className="w-10 h-10 flex items-center justify-center rounded-full"
//       style={{ backgroundColor: color }}
//     >
//       {icon}
//     </div>
//     <h3 className="font-semibold text-white">{title}</h3>
//     <p className="text-gray-400 text-sm flex-grow">{desc}</p>
//   </div>
// );

// export default function Partnership() {
//   return (
//     <div id="mining" className="relative bg-[#000B1F] flex flex-col items-center px-4 md:px-10 lg:px-20 pt-16 pb-12 text-center min-h-screen text-white">
//       <div className="absolute right-0 -bottom-10 custom-radial-gradient-purpleWhiteSmall opacity-60 z-0" />

//       <div className="z-10 max-w-3xl space-y-4">
//         <h1 className="text-3xl md:text-4xl font-bold">
//           MINING PARTNERSHIPS - Securing Real-World Value
//         </h1>
//         <p className="text-gray-400 text-sm md:text-base">
//           AGUA isn't just backed by precious metals—it secures long-term
//           reserves by partnering with global mining operations.
//         </p>
//       </div>

//       <div className="z-10 flex gap-4 lg:flex-row flex-col justify-center mt-12 w-full max-w-6xl">
//         <div className="grid grid-cols-1 gap-4 lg:w-1/3 w-full justify-between ">
//           {partnershipfeatures.map((item, i) => (
//             <Card
//               key={i}
//               icon={item.icon}
//               title={item.title}
//               desc={item.desc}
//               color={item.color}
//             />
//           ))}
//         </div>
//         <div className="lg:w-2/3 w-full ">
//           <img
//             className="rounded-lg shadow-md w-full  object-cover"
//             src="/agua-pic3.png"
//             alt="Mining"
//           />
//         </div>
//       </div>

//       <div className="z-10 flex flex-col w-full lg:flex-row items-center justify-between max-w-6xl gap-4 mt-16">
//         {partnershipflow.map((item, i) => (
//           <div key={i} className="flex items-center gap-3">
//             <Card icon={item.icon} title={item.title} desc={item.desc} />
//              {i < partnershipflow.length - 1 && (
//                <FaArrowRight className="text-blue-500 hidden md:block" />
//              )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }











import { GiMining } from "react-icons/gi";
import { MdOutlineSecurity } from "react-icons/md";
import { AiFillGold } from "react-icons/ai";
import { FaBuildingColumns, FaArrowRight } from "react-icons/fa6";

function Partnership() {
  return (
    <div id="mining" className="relative bg-[#000B1F] flex flex-col items-center pt-16 text-center px-4 md:px-10 lg:px-20 min-h-screen">
      <div className="absolute right-0 -bottom-10 custom-radial-gradient-purpleWhiteSmall opacity-60 z-30"></div>
      
      <div className="z-10 flex flex-col items-center w-full md:w-3/4 lg:w-2/4 space-y-4 md:space-y-6">
        <h1 className="text-3xl font-medium text-white">
          MINING PARTNERSHIPS - Securing Real-World Value
        </h1>
        <h2 className="text-sm text-gray-400 font-extralight">
          AGUA isn't just backed by precious metals—it secures long-term reserves by partnering with global mining operations.
        </h2>
      </div>

      <div className="flex flex-col justify-center md:flex-row mt-10 space-x-0 md:space-x-6 space-y-6 md:space-y-0 items-center">
        <div className="space-y-2 flex md:flex-col flex-wrap justify-center gap-8 md:gap-0">
          <div className="card w-56 bg-[#0F1A2C] shadow-sm card-xs">
            <div className="card-body">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00A2D2]">
                <GiMining className="text-white text-2xl" />
              </div>
              <h2 className="card-title text-start">We Fund Miners</h2>
              <p className="text-start">AGUA provides capital for ethical mining projects.</p>
            </div>
          </div>
          <div className="card w-56 bg-[#0F1A2C] shadow-sm card-xs">
            <div className="card-body">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#06B898]">
                <MdOutlineSecurity className="text-white text-2xl" />
              </div>
              <h2 className="card-title text-start">We Secure Reserves</h2>
              <p className="text-start">AGUA gets first right to purchase silver and gold.</p>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-sm w-5/6 md:w-3/5 lg:w-2/4 xl:w-5/12">
          <figure>
            <img className="w-full h-auto object-contain" src="/agua-pic3.png" alt="Mining" />
          </figure>
        </div>
      </div>

      <div className="flex flex-wrap sm:flex-row mt-6 mb-10 gap-4 md:-gap-2 items-center justify-center">
        <div className="card h-40 w-40 sm:w-56 bg-[#0F1A2C] shadow-sm card-xs">
          <div className="card-body">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1D2839]">
              <AiFillGold className="text-white text-2xl" />
            </div>
            <h2 className="card-title text-start">Mining</h2>
            <p className="text-start">Mining includes extracting valuable resources from the Earth's surface.</p>
          </div>
        </div>
        <FaArrowRight className="text-blue-600 text-2xl hidden md:block" />
        <div className="card h-40 w-40 sm:w-56 bg-[#0F1A2C] shadow-sm card-xs">
          <div className="card-body">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1D2839]">
              <FaBuildingColumns className="text-white text-2xl" />
            </div>
            <h2 className="card-title text-start">Reserve</h2>
            <p className="text-start">Reserves are resources stored for future use and availability.</p>
          </div>
        </div>
        <FaArrowRight className="text-blue-600 text-2xl hidden md:block" />
        <div className="card h-40 w-40 sm:w-56 bg-[#0F1A2C] shadow-sm card-xs">
          <div className="card-body">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1D2839]">
              <MdOutlineSecurity className="text-white text-2xl" />
            </div>
            <h2 className="card-title text-start">Blockchain Verification</h2>
            <p className="text-start">Blockchain verification ensures the security and validity of transactions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partnership;