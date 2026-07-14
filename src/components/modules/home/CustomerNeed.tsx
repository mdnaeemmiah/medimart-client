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
    <section className="section-shell py-16">
      <div className="mb-8 text-center">
        <p className="section-kicker">Community requests</p>
        <h2 className="section-title mt-3">Customer Requested Medicines</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((item: any) => (
          <div
            key={item._id}
            className="surface-card overflow-hidden rounded-lg p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <Image
              src={item.image || '/placeholder-medicine.jpg'}
              alt={item.medicineName}
              width={400}
              height={250}
              className="mb-4 h-[200px] w-full rounded-md object-cover"
            />

            <h3 className="mb-3 text-xl font-semibold text-slate-950 dark:text-white">{item.medicineName}</h3>

            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p><span className="font-medium text-slate-900 dark:text-white">Need Date:</span> {item.needDate}</p>
            <p><span className="font-medium text-slate-900 dark:text-white">Requester:</span> {item.requesterName}</p>
            <p><span className="font-medium text-slate-900 dark:text-white">Contact:</span> {item.contactNumber}</p>
            <p><span className="font-medium text-slate-900 dark:text-white">Location:</span> {item.location}</p>
            <p className="pt-2">
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerNeed;
