"use client";

import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const appointmentData = [
  { month: "Jan", appointments: 30 },
  { month: "Feb", appointments: 45 },
  { month: "Mar", appointments: 65 },
  { month: "Apr", appointments: 80 },
];

const medicineData = [
  { medicine: "Paracetamol", count: 150 },
  { medicine: "Amoxicillin", count: 110 },
  { medicine: "Atorvastatin", count: 90 },
  { medicine: "Omeprazole", count: 70 },
];

const feedbackData = [
  { name: "Excellent", value: 70 },
  { name: "Good", value: 20 },
  { name: "Average", value: 5 },
  { name: "Poor", value: 3 },
  { name: "Very Poor", value: 2 },
];

const colors = ["#0f766e", "#0284c7", "#f59e0b", "#fb7185", "#ef4444"];

const chartCard = "dashboard-card rounded-lg p-4 md:p-6";

const CustomerGraph = () => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="section-kicker">Care activity</p>
          <h2 className="section-title mt-3">Your Healthcare Dashboard</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            Track appointments, common prescriptions, and feedback trends from
            your MediMart care journey.
          </p>
        </div>
        <span className="stat-pill">Patient insights</span>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className={chartCard}>
          <h3 className="mb-4 text-lg font-semibold text-slate-950 dark:text-white">
            Appointments Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={appointmentData}>
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Legend />
              <Line type="monotone" dataKey="appointments" stroke="#0f766e" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={chartCard}>
          <h3 className="mb-4 text-lg font-semibold text-slate-950 dark:text-white">
            Top Prescribed Medicines
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={medicineData}>
              <XAxis dataKey="medicine" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Legend />
              <Bar dataKey="count" fill="#0284c7" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`${chartCard} xl:col-span-2`}>
          <h3 className="mb-4 text-lg font-semibold text-slate-950 dark:text-white">
            Patient Feedback Ratings
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={feedbackData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                label
              >
                {feedbackData.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default CustomerGraph;
