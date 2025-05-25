"use client";

import React from "react";

const lines = [
  "Medical",
  "Doctor",
  "Medicine",
  "Checkup Package",
];

const Banner = () => {
  // Join the lines with some spacing to create continuous scrolling effect
  const scrollingText = lines.join("   •   ");

  return (
    <div className="w-full overflow-hidden  py-4">
      <div className="whitespace-nowrap inline-block animate-scrollLeft text-2xl font-semibold text-violet-600">
        {scrollingText} &nbsp; &nbsp; {scrollingText}
      </div>

      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scrollLeft {
          display: inline-block;
          animation: scrollLeft 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Banner;
