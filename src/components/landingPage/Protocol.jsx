"use client";
import { steps } from "@/content/data";

export default function Protocol() {
  return (
    <div className="relative my-20 px-4 bg-white md:px-10 lg:px-20 space-y-4 ">
      {/* Intro Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-black px-4 md:px-10 lg:px-20 py-12">
        {/* Left: Heading */}
        <div className="flex flex-col justify-center text-center lg:text-left space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold font-poppins leading-tight text-gray-800">
            How AGUA Works <br className="hidden md:block" />
            <span style={{ color: "var(--color-primary)" }}>The Protocol</span>
          </h2>
          <div
            className="w-20 h-1 mx-auto lg:mx-0"
            style={{ backgroundColor: "var(--color-primary)" }}
          ></div>
        </div>

        {/* Right: Description */}
        <div className="flex items-center justify-center lg:justify-end text-gray-600">
          <p className="text-lg md:text-xl font-light max-w-xl leading-relaxed text-center lg:text-right">
            AGUA's protocol enables{" "}
            <span className="text-black font-medium">secure transactions</span>,
            <span className="text-black font-medium">liquidity</span>, and
            decentralized asset management using modern{" "}
            <span className="text-black font-medium">
              blockchain technology
            </span>
            .
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="flex justify-center ">
        <img
          src="/agua-pic2.png"
          alt="AGUA Protocol"
          className="w-full max-w-6xl object-contain"
        />
      </div>

      {/* Steps Cards */}
      <div className="grid  mx-auto w-full lg:w-5/6 grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4 text-black">
        {steps.map((item, i) => (
          <div
            key={i}
            className="bg-[#FFF7E3] border border-amber-300 rounded-xl p-4 shadow-sm hover:shadow-lg transition"
          >
            <h3 className="text-md font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
