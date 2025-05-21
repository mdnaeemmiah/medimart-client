/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';

const Heading = () => {
  const [time, setTime] = useState(new Date());

  const [districts, setDistricts] = useState([
    {
      zila: 'Dhaka',
      medical: 'Dhaka Medical College Hospital',
      services: 'Cardiology, Neurology, General Medicine',
    },
    {
      zila: 'Chittagong',
      medical: 'Chittagong Medical College',
      services: 'Orthopedics, Dermatology, Pediatrics',
    },
    {
      zila: 'Sylhet',
      medical: 'Sylhet MAG Osmani Medical College',
      services: 'ENT, Dental Care, Diagnostic Centers',
    },
    {
      zila: 'Rajshahi',
      medical: 'Rajshahi Medical College',
      services: 'Cancer Treatment, Pathology, Eye Care',
    },
    {
      zila: 'Khulna',
      medical: 'Khulna Medical College',
      services: 'Surgery, General Practice, Maternity',
    },
    {
      zila: 'Barisal',
      medical: 'Sher-e-Bangla Medical College',
      services: 'Child Care, Urology, Physiotherapy',
    },
    {
      zila: 'Rangpur',
      medical: 'Rangpur Medical College',
      services: 'Dermatology, Diagnostics, Internal Medicine',
    },
    {
      zila: 'Comilla',
      medical: 'Cumilla Medical College',
      services: 'Mental Health, Dentistry, ENT',
    },
    {
      zila: 'Jessore',
      medical: 'Jessore Medical Hospital',
      services: 'Pediatrics, Pathology, Orthopedics',
    },
    {
      zila: 'Bogra',
      medical: 'Shaheed Ziaur Rahman Medical College',
      services: 'Cardiology, Neurology, Emergency Care',
    },
    {
      zila: 'Mymensingh',
      medical: 'Mymensingh Medical College',
      services: 'Maternity, General Checkup, Eye Care',
    },
    {
      zila: 'Faridpur',
      medical: 'Faridpur Medical College',
      services: 'Pathology, General Surgery, Dentistry',
    },
    {
      zila: 'Cox’s Bazar',
      medical: 'Cox’s Bazar General Hospital',
      services: 'Emergency, Pharmacy, Clinics',
    },
    {
      zila: 'Narayanganj',
      medical: 'Narayanganj General Hospital',
      services: 'Health Checkup, Diabetes Care, ENT',
    },
    {
      zila: 'Pabna',
      medical: 'Pabna Medical College',
      services: 'Neurology, General Health, Urology',
    },
  ]);

  const [upcomingDistricts, setUpcomingDistricts] = useState([
    {
      zila: 'Noakhali',
      medical: 'Noakhali Medical Institute',
      services: 'ENT, Maternity, Pharmacy',
    },
    {
      zila: 'Tangail',
      medical: 'Tangail Healthcare Center',
      services: 'Cardiology, Dermatology, Surgery',
    },
    {
      zila: 'Gazipur',
      medical: 'Gazipur General Hospital',
      services: 'Dental Care, Pediatrics, Pathology',
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-6 text-center">
      <h2 className="text-3xl font-bold text-purple-700 mb-2">
        Explore Medical Services by District
      </h2>
  
      <p className="text-lg mb-4 px-4">
        Discover trusted healthcare services from across Bangladesh. Each district offers
        specialized treatments, clinics, and hospitals to ensure quality care.
      </p>

      <p className="text-sm  mb-6">
        Current Date & Time:{' '}
        <span className="font-semibold text-blue-600">
          {time.toLocaleDateString()} {time.toLocaleTimeString()}
        </span>
      </p>

      {/* Medical Branches */}
      <h3 className="text-xl font-semibold mb-2 text-orange-500">Medical Branches</h3>
      <div className="overflow-hidden w-full mb-10">
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {[...districts, ...districts].map((district, index) => (
            <div
              key={index}
              className="w-64 h-60 shadow-[0_4px_20px_rgba(0,0,0,0.5)] rounded-xl p-4 flex flex-col items-center justify-center 
                         transition transform hover:scale-105"
            >
              <h1 className="text-lg font-bold ">{district.zila}</h1>
              <p className="text-sm text-purple-700 mt-1 font-semibold text-center">{district.medical}</p>
              <p className="text-sm text-gray-600 mt-2 text-center">{district.services}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Medical Branches */}
      <h3 className="text-xl font-semibold mb-2 text-green-500">Upcoming Medical Branches</h3>
      <div className="flex flex-wrap justify-center gap-6">
        {upcomingDistricts.map((district, index) => (
          <div
            key={index}
            className="w-64 h-60  shadow-[0_4px_20px_rgba(0,0,0,0.5)] rounded-xl p-4 flex flex-col items-center justify-center 
                       transition transform hover:scale-105"
          >
            <h1 className="text-lg font-bold ">{district.zila}</h1>
            <p className="text-sm text-purple-700 mt-1 font-semibold text-center">{district.medical}</p>
            <p className="text-sm text-gray-600 mt-2 text-center">{district.services}</p>
            <span className="text-xs mt-2 text-red-500 font-medium">Coming Soon</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Heading;
