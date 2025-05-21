'use client'; // Only needed for app router if using client-side features

import Image from 'next/image';
import React from 'react';
import img1 from '../../../app/assets/premium_photo-1661893870720-e2f6d09d96d7.avif';
import img2 from '../../../app/assets/photo-1580281657702-257584239a55.avif';


const Dynamic = () => {
  return (
    <div className="flex items-center justify-center px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
        {/* Medical Image Section */}
        <div className="bg-white shadow-xl rounded-xl p-4 flex justify-center items-center">
          <Image
            src={img1}
            alt="Medical"
            width={400}
            height={300}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Doctor Image Section */}
        <div className="bg-white shadow-xl rounded-xl p-4 flex justify-center items-center">
          <Image
            src={img2}
            alt="Doctor"
            width={400}
            height={300}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Dynamic;
