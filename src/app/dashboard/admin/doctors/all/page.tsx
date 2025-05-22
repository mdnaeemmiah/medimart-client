/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import Image from 'next/image';
import { useGetDoctorsQuery } from '@/redux/features/doctor/doctorSlice';


const DoctorsAllPage = () => {
  const { data, isLoading, isError } = useGetDoctorsQuery(undefined);

  const doctors = data?.data || []; // Adjust according to actual API shape

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching doctors.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Doctors</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-left text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Hospital</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Time</th>
              <th className="p-3 border">Day</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor: any, index: number) => (
              <tr key={doctor._id || index} className="border-t hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">
                  {doctor.image ? (
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="p-3 border">{doctor.name || 'N/A'}</td>
                <td className="p-3 border">{doctor.hospital || 'N/A'}</td>
                <td className="p-3 border">{doctor.date || 'N/A'}</td>
                <td className="p-3 border">{doctor.time || 'N/A'}</td>
                <td className="p-3 border">{doctor.day || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorsAllPage;
