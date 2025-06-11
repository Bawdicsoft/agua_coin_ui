"use client";

import { MdArrowOutward } from "react-icons/md";
import Button from "../Button";

function Herosection() {
  return (
    <div
      className="relative z-0 min-h-screen flex flex-col items-center text-center px-4 md:px-10 lg:px-20 
      bg-[url('/Agua-herosection-bg1.png')] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute right-0 -bottom-10 custom-radial-gradient-purpleWhiteSmall opacity-60 z-0" />

      <div className="pt-24 flex flex-col items-center w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:w-2/4 space-y-4 md:space-y-6 z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          The Future of Stable, Precious Metal-Backed Digital
        </h1>

        <h2 className="text-sm sm:text-md md:text-lg font-semibold text-white">
          A decentralized currency secured by gold & silver, designed for
          financial stability, growth, and real-world impact
        </h2>

        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            variant="primary"
            size="md"
            iconRight={<MdArrowOutward />}
          >
            Buy AGUA
          </Button>
          <Button
            variant="outline"
            size="md"
            iconRight={<MdArrowOutward />}
            className="border-white text-white hover:bg-white hover:text-black"
          >
            Learn More
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-12 justify-center">
          {[0, 1, 2].map((i) => (
            <img
              key={i}
              className={`${
                i === 1
                  ? "w-20 h-20 md:w-28 md:h-28"
                  : "w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
              }`}
              src="/Agua-logo-crop.png"
              alt="Agua Logo"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Herosection;
