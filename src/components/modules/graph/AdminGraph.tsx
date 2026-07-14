"use client";

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", Appointments: 120, Prescriptions: 100, Treated: 90, Pending: 30 },
  { month: "Feb", Appointments: 150, Prescriptions: 130, Treated: 110, Pending: 40 },
  { month: "Mar", Appointments: 180, Prescriptions: 160, Treated: 140, Pending: 35 },
  { month: "Apr", Appointments: 170, Prescriptions: 150, Treated: 145, Pending: 25 },
  { month: "May", Appointments: 200, Prescriptions: 180, Treated: 160, Pending: 50 },
  { month: "Jun", Appointments: 220, Prescriptions: 200, Treated: 190, Pending: 45 },
];

const totals = [
  { label: "Appointments", value: "1,040", tone: "text-teal-700 dark:text-teal-300" },
  { label: "Prescriptions", value: "920", tone: "text-sky-700 dark:text-sky-300" },
  { label: "Treated", value: "835", tone: "text-emerald-700 dark:text-emerald-300" },
  { label: "Pending", value: "225", tone: "text-amber-700 dark:text-amber-300" },
];

const AdminGraph = () => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="section-kicker">Monthly overview</p>
          <h2 className="section-title mt-3">Doctor and Medicine Statistics</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            A quick operational snapshot of appointments, prescriptions,
            completed care, and pending follow-ups.
          </p>
        </div>
        <span className="stat-pill">Updated this quarter</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {totals.map((item) => (
          <div key={item.label} className="dashboard-card rounded-lg p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
            <p className={`mt-2 text-3xl font-bold ${item.tone}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-card rounded-lg p-4 md:p-6">
        <ResponsiveContainer width="100%" height={430}>
          <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip
              cursor={{ fill: "rgba(20, 184, 166, 0.08)" }}
              contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }}
            />
            <Legend />
            <Bar dataKey="Appointments" fill="#0f766e" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Prescriptions" fill="#0284c7" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Treated" fill="#16a34a" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Pending" fill="#f59e0b" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default AdminGraph;
