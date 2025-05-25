/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useGetOrdersQuery } from '@/redux/features/order/orderSlice';
import React from 'react';

// Badge generator based on order status
const getStatusBadge = (status: string) => {
  let color = '';

  switch (status) {
    case 'Pending':
      color = 'bg-yellow-100 text-yellow-800';
      break;
    case 'Paid':
      color = 'bg-blue-100 text-blue-800';
      break;
    case 'Shipped':
      color = 'bg-indigo-100 text-indigo-800';
      break;
    case 'Completed':
      color = 'bg-green-100 text-green-800';
      break;
    case 'Cancelled':
      color = 'bg-red-100 text-red-800';
      break;
    default:
      color = 'bg-gray-100 text-gray-800';
  }

  return (
    <span
      className={`text-xs font-semibold px-2 py-1 rounded-full inline-block ${color}`}
    >
      {status}
    </span>
  );
};

const Page = () => {
  const { data, isLoading, isError } = useGetOrdersQuery(undefined);
  const orders = data?.data || [];

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load orders.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Order History</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-0  shadow-md rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-600 text-white text-sm uppercase">
                <th className="px-4 py-3 text-left border">Order ID</th>
                <th className="px-4 py-3 text-left border">Date</th>
                <th className="px-4 py-3 text-center border">Products</th>
                <th className="px-4 py-3 text-left border">Total (৳)</th>
                <th className="px-4 py-3 text-left border">Status</th>
                <th className="px-4 py-3 text-left border">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any, index: number) => (
                <tr
                  key={order._id}>
                  <td className="px-4 py-3 border">{order._id}</td>
                  <td className="px-4 py-3 border">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    {order.products?.length}
                  </td>
                  <td className="px-4 py-3 border">৳{order.totalPrice}</td>
                  <td className="px-4 py-3 border">{getStatusBadge(order.status)}</td>
                  <td className="px-4 py-3 border">
                    {order.transaction?.id || '—'}
                  </td>
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
