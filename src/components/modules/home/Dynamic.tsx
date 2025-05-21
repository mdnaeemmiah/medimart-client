'use client'; // Only needed for app router if using client-side features

import Image from 'next/image';
import React from 'react';

const Dynamic = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
        {/* Medical Image Section */}
        <div className="bg-white shadow-xl rounded-xl p-4 flex justify-center items-center">
          <Image
            src="https://via.placeholder.com/400x300?text=Medical+Image"
            alt="Medical"
            width={400}
            height={300}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Doctor Image Section */}
        <div className="bg-white shadow-xl rounded-xl p-4 flex justify-center items-center">
          <Image
            src="https://via.placeholder.com/400x300?text=Doctor+Image"
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
