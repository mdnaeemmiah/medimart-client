/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { useGetAllNeedMedicinesQuery } from '@/redux/features/needMedicine/needMedicineSlice';
import Image from 'next/image';

const CustomerNeed = () => {
  const { data, isLoading, isError } = useGetAllNeedMedicinesQuery(undefined);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load data.</p>;

  return (
    <section className="px-4 py-10 ">
      <h2 className="text-3xl font-bold text-center mb-10 text-blue-700">
       Customer  Requested Medicines
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((item: any) => (
          <div
            key={item._id}
            className="border-2 shadow-md rounded-xl overflow-hidden p-4 hover:shadow-xl transition duration-300"
          >
            <Image
              src={item.image || '/placeholder-medicine.jpg'}
              alt={item.medicineName}
              width={400}
              height={250}
              className="rounded-md w-full h-[200px] object-cover mb-4"
            />

            <h3 className="text-xl font-semibold text-blue-600 mb-2">{item.medicineName}</h3>

            <p><span className="font-medium">Need Date:</span> {item.needDate}</p>
            <p><span className="font-medium">Requester:</span> {item.requesterName}</p>
            <p><span className="font-medium">Contact:</span> {item.contactNumber}</p>
            <p><span className="font-medium">Location:</span> {item.location}</p>
            <p>
              <span className="font-medium">Status:</span>{' '}
              <span className={`inline-block px-2 py-1 rounded text-sm ${
                item.status === 'pending'
                  ? 'bg-yellow-200 text-yellow-800'
                  : item.status === 'approved'
                  ? 'bg-green-200 text-green-800'
                  : 'bg-red-200 text-red-800'
              }`}>
                {item.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerNeed;
