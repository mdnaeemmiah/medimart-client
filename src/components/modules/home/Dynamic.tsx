'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import img1 from '../../../app/assets/pexels-photo-3844581.webp';
import img2 from '../../../app/assets/photo-1580281657702-257584239a55.avif';
import img3 from '../../../app/assets/photo-1530026405186-ed1f139313f8.avif';
import img4 from '../../../app/assets/pexels-photo-3273989.jpeg';

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
  {
    image: img3,
    alt: 'Surgery',
    text: 'Advanced Surgical Facilities',
  },
  {
    image: img4,
    alt: 'Laboratory',
    text: 'State-of-the-art Lab Services',
  },
];

const Dynamic = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imageData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Create a rotating window of 4 images
  const rotatingImages = Array.from({ length: 4 }, (_, i) => {
    const currentIndex = (index + i) % imageData.length;
    return imageData[currentIndex];
  });

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-violet-600">
        Our Service Technology
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {rotatingImages.map((item, i) => (
          <div
            key={i}
            className="shadow-xl rounded-xl p-4 flex flex-col justify-center items-center text-center"
          >
            <Image
              src={item.image}
              alt={item.alt}
              width={400}
              height={300}
              className="rounded-lg object-cover transition duration-500"
            />
            <p className="mt-4 text-lg font-medium">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dynamic;
