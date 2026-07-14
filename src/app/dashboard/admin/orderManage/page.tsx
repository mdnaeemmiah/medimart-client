/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useGetOrdersQuery } from "@/redux/features/order/orderSlice";

const getStatusBadge = (status: string) => {
    let color = "bg-slate-100 text-slate-700";

    switch (status) {
        case "Pending":
            color = "bg-amber-100 text-amber-800";
            break;
        case "Paid":
            color = "bg-sky-100 text-sky-800";
            break;
        case "Shipped":
            color = "bg-indigo-100 text-indigo-800";
            break;
        case "Completed":
            color = "bg-emerald-100 text-emerald-800";
            break;
        case "Cancelled":
            color = "bg-rose-100 text-rose-800";
            break;
        default:
            color = "bg-slate-100 text-slate-700";
    }

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${color}`}>
            {status}
        </span>
    );
};

const Page = () => {
    const { data, isLoading, isError } = useGetOrdersQuery(undefined);
    const orders = data?.data || [];
    const summary = orders.reduce(
        (acc: { total: number; completed: number; pending: number }, order: any) => {
            acc.total += 1;
            if (order.status === "Completed") acc.completed += 1;
            if (order.status === "Pending") acc.pending += 1;
            return acc;
        },
        { total: 0, completed: 0, pending: 0 }
    );

    if (isLoading) return <p className="p-4">Loading...</p>;
    if (isError) return <p className="p-4 text-red-500">Failed to load orders.</p>;

    return (
        <div className="space-y-6 p-4">
            <section className="dashboard-card relative overflow-hidden p-6 md:p-8">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-emerald-500/25 via-sky-400/10 to-transparent" />
                <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-200">
                        Orders
                    </p>
                    <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Order Management</h1>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Monitor fulfillment and payment status across all customers.
                    </p>
                    <div className="mt-5 grid gap-3 md:grid-cols-3">
                        <div className="rounded-2xl border border-sky-200/60 bg-white/70 p-4 text-center shadow-sm dark:border-sky-400/20 dark:bg-slate-900/60">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Total</p>
                            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{summary.total}</p>
                        </div>
                        <div className="rounded-2xl border border-emerald-200/60 bg-white/70 p-4 text-center shadow-sm dark:border-emerald-400/20 dark:bg-slate-900/60">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Completed</p>
                            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{summary.completed}</p>
                        </div>
                        <div className="rounded-2xl border border-amber-200/60 bg-white/70 p-4 text-center shadow-sm dark:border-amber-400/20 dark:bg-slate-900/60">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Pending</p>
                            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{summary.pending}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="dashboard-card p-4 md:p-6">
                {orders.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-emerald-200/70 bg-emerald-50/60 p-6 text-center dark:border-emerald-400/20 dark:bg-slate-900/60">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">No orders found.</p>
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">New orders will appear here.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-white">
                                    <th className="px-4 py-3">Order ID</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3 text-center">Products</th>
                                    <th className="px-4 py-3">Total (৳)</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Transaction ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order: any) => (
                                    <tr key={order._id}>
                                        <td className="px-4 py-3">{order._id}</td>
                                        <td className="px-4 py-3">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {order.products?.length}
                                        </td>
                                        <td className="px-4 py-3">৳{order.totalPrice}</td>
                                        <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
                                        <td className="px-4 py-3">{order.transaction?.id || "—"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Page;