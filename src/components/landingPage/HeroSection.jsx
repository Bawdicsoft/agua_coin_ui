// "use client";

// import { MdArrowOutward } from "react-icons/md";
// import Button from "../Button";
// import React from "react";
// import { useRouter } from "next/navigation";

// function Herosection() {
//   const router = useRouter();

//   const handleRoute = () => {
//     router.push("/auth/signin"); 
//   };
//   const handleRoute2 = () => {
//     router.push("/auth/signup"); 
//   };
//   return (
//     <div
//       className="relative z-0 lg:min-h-screen -ml-1 md:py-12  py-24 flex flex-col items-center text-center px-4 md:px-10 lg:px-20 
//       bg-[url('/Agua-herosection-bg.png')] bg-cover bg-center bg-no-repeat"
//     >
//       <div className="absolute right-0 -bottom-10 custom-radial-gradient-purpleWhiteSmall opacity-60 z-0" />

//       <div className="lg:pt-42 md:pt-24 flex flex-col items-center w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:w-2/4 space-y-4 md:space-y-6 z-10">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
//           The Future of Stable, Precious Metal-Backed Digital
//         </h1>

//         <h2 className="text-sm sm:text-md md:text-lg font-semibold text-white">
//           A decentralized currency secured by gold & silver, designed for
//           financial stability, growth, and real-world impact
//         </h2>

//         <div className="flex flex-wrap gap-3 justify-center">
//           <Button
//             onClick={handleRoute}
//             variant="primary"
//             size="md"
//             iconRight={<MdArrowOutward />}
//           >
//             Buy AGUA
//           </Button>
//           <Button
//             onClick={handleRoute2}
//             variant="outline"
//             size="md"
//             iconRight={<MdArrowOutward />}
//             className="border-white text-white hover:bg-white hover:text-black"
//           >
//             Learn More
//           </Button>
//         </div>

//         <div className="flex flex-wrap gap-4 md:gap-12 justify-center">
//           {[0, 1, 2].map((i) => (
//             <img
//               key={i}
//               className={`${
//                 i === 1
//                   ? "w-20 h-20 md:w-28 md:h-28"
//                   : "w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
//               }`}
//               src="/Agua-logo-crop.png"
//               alt="Agua Logo"
//               loading="lazy"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Herosection;









import { MdArrowOutward } from "react-icons/md";
import Navbar from "../navbar";
import Button from "../Button";

function Herosection() {
  return (
    <>
      <div
        className="relative min-h-screen flex flex-col items-center text-center px-4 md:px-10 lg:px-20 
        bg-[url('/Agua-herosection-bg1.png')] bg-cover -ml-2 bg-center bg-no-repeat"
      >
        <Navbar />
        <div className="absolute right-0 -bottom-10 custom-radial-gradient-purpleWhiteSmall opacity-60"></div>

        <div className="pt-8 flex flex-col items-center w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:w-2/4 space-y-4 md:space-y-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            The Future of Stable, Precious Metal-Backed Digital
          </h1>

          <h2 className="text-sm sm:text-md md:text-lg font-semibold text-white">
            A decentralized currency secured by gold & silver, designed for financial stability, growth, and real-world impact
          </h2>

           {/* <div className="flex flex-wrap gap-3 justify-center">
          <Button
            onClick={handleRoute}
            variant="primary"
            size="md"
            iconRight={<MdArrowOutward />}
          >
            Buy AGUA
          </Button>
          <Button
            onClick={handleRoute2}
            variant="outline"
            size="md"
            iconRight={<MdArrowOutward />}
            className="border-white text-white hover:bg-white hover:text-black"
          >
            Learn More
          </Button>
        </div> */}

          <div className="flex flex-wrap gap-4 md:gap-12 justify-center">
            <img className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40" src="/Agua-logo-crop.png" />
            <img className="w-20 h-20 md:w-28 md:h-28 mt-18" src="/Agua-logo-crop.png" />
            <img className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40" src="/Agua-logo-crop.png" />
          </div>
        </div>
      </div>
    </>
  );
}

const ButtonWrapper = () => {
  return (
    <div className="flex items-center justify-center">
      <NeumorphismButton />
    </div>
  );
};

const NeumorphismButton = () => {
  return (
    <button
      className="
        px-4 py-2 rounded-full 
        border border-amber-50
        flex items-center gap-2 
        text-black bg-white
        transition-all
        hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
      "
    >
      <span>Buy AGUA</span>
      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-black">
        <MdArrowOutward className="text-white text-md" />
      </div>
    </button>
  );
};

const ButtonWrapper1 = () => {
  return (
    <div className="flex items-center justify-center">
      <NeumorphismButton1 />
    </div>
  );
};

const NeumorphismButton1 = () => {
  return (
    <button
      className="
        px-4 py-2 rounded-full 
        border border-amber-50
        flex items-center gap-2 
        text-white
        transition-all
        hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
        hover:text-white
      "
    >
      <span>Learn More</span>
      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white">
        <MdArrowOutward className="text-black text-md" />
      </div>
    </button>
  );
};

export default Herosection;

