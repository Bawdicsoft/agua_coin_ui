// "use client";
// import { steps } from "@/content/data";

// export default function Protocol() {
//   return (
//     <div id="protocol" className="relative py-20 px-4 bg-white md:px-10 lg:px-20 space-y-4 ">
//       {/* Intro Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-black px-4 md:px-10 lg:px-20 py-12">
//         {/* Left: Heading */}
//         <div className="flex flex-col justify-center text-center lg:text-left space-y-6">
//           <h2 className="text-3xl md:text-4xl font-extrabold font-poppins leading-tight text-gray-800">
//             How AGUA Works <br className="hidden md:block" />
//             <span style={{ color: "var(--color-primary)" }}>The Protocol</span>
//           </h2>
//           <div
//             className="w-20 h-1 mx-auto lg:mx-0"
//             style={{ backgroundColor: "var(--color-primary)" }}
//           ></div>
//         </div>

//         {/* Right: Description */}
//         <div className="flex items-center justify-center lg:justify-end text-gray-600">
//           <p className="text-lg md:text-xl font-light max-w-xl leading-relaxed text-center lg:text-right">
//             AGUA's protocol enables{" "}
//             <span className="text-black font-medium">secure transactions</span>,
//             <span className="text-black font-medium">liquidity</span>, and
//             decentralized asset management using modern{" "}
//             <span className="text-black font-medium">
//               blockchain technology
//             </span>
//             .
//           </p>
//         </div>
//       </div>

//       {/* Image */}
//       <div className="flex justify-center ">
//         <img
//           src="/agua-pic2.png"
//           alt="AGUA Protocol"
//           className="w-full max-w-6xl object-contain"
//         />
//       </div>

//       {/* Steps Cards */}
//       <div className="grid  mx-auto w-full lg:w-5/6 grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4 text-black">
//         {steps.map((item, i) => (
//           <div
//             key={i}
//             className="bg-[#FFF7E3] border border-amber-300 rounded-xl p-4 shadow-sm hover:shadow-lg transition"
//           >
//             <h3 className="text-md font-semibold mb-2">{item.title}</h3>
//             <p className="text-gray-600 text-sm">{item.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }







function Protocol() {
  return (
    <>
      <div id="protocol" className="relative bg-white pt-20 px-4 md:px-10 lg:px-20">
        <div className="relative z-10 flex flex-col text-black">
          <div className="grid grid-cols-1 lg:grid-cols-2 flex-grow overflow-x-hidden">
            <div className="flex flex-col justify-center sm:p-10 rounded-lg bg-no-repeat bg-cover">
              <h2 className="text-xl sm:text-3xl font-semibold font-poppins max-w-2xl text-center md:text-left">
                HOW AGUA WORKS - The Protocol
              </h2>
            </div>

            {/* Responsive Description */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="max-w-lg mx-auto md:mx-0 text-gray-500 text-center md:text-end">
                <h1 className="font-extralight">
                  AGUA's protocol enables secure transactions, liquidity, and
                  decentralized asset management using blockchain technology.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex bg-white justify-center items-center lg:-mt-4">
        <img src="/agua-pic2.png" className="lg:w-3/4 h-1/2 object-contain" />
      </div>

      <div className="text-black bg-white flex flex-wrap justify-center gap-3 mb-6">
        <div className="card lg:w-48 md:w-40 w-32 sm:h-32 md:h-40 bg-[#FFF7E3] border-[1.5px] border-amber-300 md:card-sm card-xs shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Acquire AGUA</h2>
            <p>Buy AGUA SAG, SAU on decentralized exchanges, exchanges or via our platform.</p>
          </div>
        </div>

        <div className="card lg:w-48 md:w-40 w-32 sm:h-32 md:h-40 bg-[#FFF7E3] border-[1.5px] border-amber-300 md:card-sm card-xs shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Precious Metal Reserves</h2>
            <p>SAG, SAU is backed by physical gold & silver stored securely in vault.</p>
          </div>
        </div>

        <div className="card lg:w-48 md:w-40 w-32 sm:h-32 md:h-40 bg-[#FFF7E3] border-[1.5px] border-amber-300 md:card-sm card-xs shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Blockchain Transparency</h2>
            <p>Every reserve is on-chain verified for security.</p>
          </div>
        </div>

        <div className="card lg:w-48 md:w-40 w-32 sm:h-32 md:h-40 bg-[#FFF7E3] border-[1.5px] border-amber-300 md:card-sm card-xs shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Real Utility</h2>
            <p>Use SAG and SAU for transactions, staking, Holding, E-commerce and so on.</p>
          </div>
        </div>

        <div className="card lg:w-48 md:w-40 w-32 sm:h-32 md:h-40 bg-[#FFF7E3] border-[1.5px] border-amber-300 md:card-sm card-xs shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Community Governance</h2>
            <p>Vote & participate in AGUA's future via DAO governance.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Protocol;
