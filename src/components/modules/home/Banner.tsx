"use client";

import React from "react";

const lines = [
  ["Medical", "Comprehensive health services for your well-being."],
  ["Doctor", "Expert medical specialists ready to assist you."],
  ["Medicine", "Quality pharmaceuticals available at your fingertips."],
  ["Checkup Package", "Affordable and thorough health screening packages."],
];

const Banner = () => {
  // Repeat content twice for smooth infinite scroll
  const tickerContent = [...lines, ...lines].map((pair, i) => (
    <span
      key={i}
      className="inline-block mr-12 text-center"
      style={{ minWidth: "200px" }}
    >
      <div className="font-bold text-violet-600">{pair[0]}</div>
      <div className="text-sm text-gray-700">{pair[1]}</div>
    </span>
  ));

  return (
    <div className="w-full overflow-hidden  py-4">
      <div
        className="whitespace-nowrap inline-block animate-scrollLeft"
        style={{ fontSize: "1.25rem" }}
      >
        {tickerContent}
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
          animation: scrollLeft 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Banner;
