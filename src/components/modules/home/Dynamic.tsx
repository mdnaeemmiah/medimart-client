'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import img1 from '../../../app/assets/pexels-photo-3844581.webp';
import img2 from '../../../app/assets/photo-1580281657702-257584239a55.avif';

const imageData = [
  {
    image: img1,
    alt: 'Medical',
    text: 'Modern Medical Equipment',
  },
  {
    image: img2,
    alt: 'Doctor',
    text: 'Qualified Healthcare Professionals',
  },
];

const Dynamic = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imageData.length);
    }, 2000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="flex items-center justify-center px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
        {/* Image Section 1 */}
        <div className="shadow-xl rounded-xl p-4 flex flex-col justify-center items-center text-center">
          <Image
            src={imageData[index].image}
            alt={imageData[index].alt}
            width={400}
            height={300}
            className="rounded-lg object-cover transition duration-500"
          />
          <p className="mt-4 text-lg font-medium ">
            {imageData[index].text}
          </p>
        </div>

        {/* Image Section 2 - Opposite image */}
        <div className="shadow-xl rounded-xl p-4 flex flex-col justify-center items-center text-center">
          <Image
            src={imageData[(index + 1) % imageData.length].image}
            alt={imageData[(index + 1) % imageData.length].alt}
            width={400}
            height={300}
            className="rounded-lg object-cover transition duration-500"
          />
          <p className="mt-4 text-lg font-medium ">
            {imageData[(index + 1) % imageData.length].text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dynamic;
