"use client";

import React from "react";

const lines = [
  ["Medical", "Health Care"],
  ["Doctor", "Specialist"],
  ["Medicine", "Pharmacy"],
  ["Checkup Package", "Health Check"],
];

const Banner = () => {
  // Join each pair with a newline and separate items by dots/spaces for scrolling
  // We use <br/> so multiline text works
  // But for scrolling ticker, we need to render JSX inside the ticker div
  // So instead of string join, map JSX with spans and wrap in inline-blocks

  // Repeat content twice for seamless scrolling
  const tickerContent = [...lines, ...lines].map((pair, i) => (
    <span
      key={i}
      className="inline-block mr-12 text-center"
      style={{ minWidth: "120px" }}
    >
      <div>{pair[0]}</div>
      <div className="text-sm text-white">{pair[1]}</div>
    </span>
  ));

  return (
    <div className="w-full overflow-hidden ">
      <div
        className="whitespace-nowrap inline-block animate-scrollLeft text-violet-600 font-semibold"
        style={{ fontSize: "1.5rem" }}
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
          animation: scrollLeft 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Banner;
