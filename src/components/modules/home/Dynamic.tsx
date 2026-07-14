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

  // Create a rotating window of 4 images (looped if less than 4)
  const rotatingImages = Array.from({ length: 4 }, (_, i) => {
    const currentIndex = (index + i) % imageData.length;
    return imageData[currentIndex];
  });

  return (
    <section className="section-shell py-16">
      <div className="mb-10 text-center">
        <p className="section-kicker">Care infrastructure</p>
        <h2 className="section-title mt-3">Our Service Technology</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {rotatingImages.map((item, i) => (
          <div
            key={i}
            className="surface-card overflow-hidden rounded-lg p-3 transition duration-500 hover:-translate-y-1 hover:shadow-md"
          >
            <Image
              src={item.image}
              alt={item.alt}
              width={400}
              height={300}
              className="h-[220px] w-full rounded-md object-cover"
            />
            <p className="mt-4 text-center text-base font-semibold text-slate-900 dark:text-white">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dynamic;
