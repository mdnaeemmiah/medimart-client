/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';

const Heading = () => {
  const [time, setTime] = useState(new Date());

  const [districts] = useState([
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

  const [upcomingDistricts] = useState([
    {
      zila: 'Brahmanbaria',
      medical: 'Brahmanbaria Medical Institute',
      services: 'ENT, Maternity, Pharmacy',
    },
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
    <section className="section-shell py-16 text-center">
      <p className="section-kicker">Bangladesh network</p>
      <h2 className="section-title mt-3">
        Explore Medical Services by District
      </h2>

      <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
        Discover trusted healthcare services from across Bangladesh. Each
        district offers specialized treatments, clinics, and hospitals to ensure
        quality care.
      </p>

      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
        Current date and time:{" "}
        <span className="font-semibold text-teal-700 dark:text-teal-300">
          {time.toLocaleDateString()} {time.toLocaleTimeString()}
        </span>
      </p>

      <h3 className="mb-4 mt-10 text-xl font-semibold text-slate-900 dark:text-white">
        Active Medical Branches
      </h3>
      <div className="mb-10 w-full overflow-hidden">
        <div className="flex gap-5 animate-marquee whitespace-nowrap">
          {[...districts, ...districts].map((district, index) => (
            <div
              key={index}
              className="surface-card flex h-56 w-64 shrink-0 flex-col items-center justify-center rounded-lg p-5 transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-md dark:hover:border-teal-400/30"
            >
              <h1 className="text-lg font-bold text-slate-950 dark:text-white">{district.zila}</h1>
              <p className="mt-2 text-center text-sm font-semibold text-teal-700 dark:text-teal-300">{district.medical}</p>
              <p className="mt-3 text-center text-sm text-slate-600 dark:text-slate-300">{district.services}</p>
            </div>
          ))}
        </div>
      </div>

      <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
        Upcoming Medical Branches
      </h3>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {upcomingDistricts.map((district, index) => (
          <div
            key={index}
            className="surface-card flex min-h-56 flex-col items-center justify-center rounded-lg p-5 transition hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">{district.zila}</h2>
            <p className="mt-2 text-center text-sm font-semibold text-teal-700 dark:text-teal-300">{district.medical}</p>
            <p className="mt-3 text-center text-sm text-slate-600 dark:text-slate-300">{district.services}</p>
            <span className="mt-4 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">Coming Soon</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Heading;
