/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useGetOrdersQuery } from '@/redux/features/order/orderSlice';
import React from 'react';

const Page = () => {
  const { data, isLoading, isError } = useGetOrdersQuery(undefined);

  const orders = data?.data || []; // Safely access array

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load orders.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Order History</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full  border border-gray-200 shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-600 text-left">
                <th className="p-3 border-b">Order ID</th>
                <th className="p-3 border-b">Date</th>
                <th className="p-3 border-b">Items</th>
                <th className="p-3 border-b">Total</th>
                <th className="p-3 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order.id} className="">
                  <td className="p-3 border-b">{order.id}</td>
                  <td className="p-3 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 border-b">{order.items?.length}</td>
                  <td className="p-3 border-b">৳{order.total}</td>
                  <td className="p-3 border-b">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;
