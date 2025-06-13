import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-white/70  z-40"></div>
      <div className="z-50 animate-spin rounded-full h-16 w-16 border-t-4 border-[#3b82f6] border-solid"></div>
    </div>
  );
};

export default Loader;
