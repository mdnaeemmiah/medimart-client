"use client";

import React from "react";

const lines = [
  ["Medical", "Comprehensive health services for your well-being."],
  ["Doctor", "Expert medical specialists ready to assist you."],
  ["Medicine", "Quality pharmaceuticals available at your fingertips."],
  ["Checkup Package", "Affordable and thorough health screening packages."],
];

const Banner = () => {
  const tickerContent = [...lines, ...lines].map((pair, i) => (
    <span
      key={i}
      className="mr-6 inline-flex min-w-[260px] items-center justify-center gap-2 rounded-full border border-teal-100 bg-white px-5 py-2 text-center shadow-sm dark:border-teal-400/20 dark:bg-white/10"
    >
      <span className="font-bold text-teal-700 dark:text-teal-300">
        {pair[0]}
      </span>
      <span className="text-sm text-slate-600 dark:text-slate-300">
        {pair[1]}
      </span>
    </span>
  ));

  return (
    <div className="w-full overflow-hidden border-b border-slate-200 bg-slate-50 py-3 dark:border-white/10 dark:bg-slate-950">
      <div
        className="whitespace-nowrap inline-block animate-scrollLeft"
      >
        {tickerContent}
      </div>

      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
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
