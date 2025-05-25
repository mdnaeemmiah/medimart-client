'use client';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Example data for doctors/medical dashboard
const data = [
  { month: 'January', Appointments: 120, Prescriptions: 100, Treated: 90, Pending: 30 },
  { month: 'February', Appointments: 150, Prescriptions: 130, Treated: 110, Pending: 40 },
  { month: 'March', Appointments: 180, Prescriptions: 160, Treated: 140, Pending: 35 },
  { month: 'April', Appointments: 170, Prescriptions: 150, Treated: 145, Pending: 25 },
  { month: 'May', Appointments: 200, Prescriptions: 180, Treated: 160, Pending: 50 },
  { month: 'June', Appointments: 220, Prescriptions: 200, Treated: 190, Pending: 45 },
];

const MedicalDashboardGraph = () => {
  return (
    <div className="p-4 bg-black rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-violet-600">
        Doctor & Medicine Statistics (Monthly)
      </h2>
      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Appointments" fill="#4F46E5" />
          <Bar dataKey="Prescriptions" fill="#10B981" />
          <Bar dataKey="Treated" fill="#FBBF24" />
          <Bar dataKey="Pending" fill="#EF4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MedicalDashboardGraph;
