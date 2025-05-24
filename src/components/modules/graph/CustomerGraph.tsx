"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Sample data for appointments over time
const appointmentData = [
  { month: "Jan", appointments: 30 },
  { month: "Feb", appointments: 45 },
  { month: "Mar", appointments: 65 },
  { month: "Apr", appointments: 80 },
];

// Sample data for top prescribed medicines
const medicineData = [
  { medicine: "Paracetamol", count: 150 },
  { medicine: "Amoxicillin", count: 110 },
  { medicine: "Atorvastatin", count: 90 },
  { medicine: "Omeprazole", count: 70 },
];

// Sample data for patient feedback
const feedbackData = [
  { name: "Excellent", value: 70 },
  { name: "Good", value: 20 },
  { name: "Average", value: 5 },
  { name: "Poor", value: 3 },
  { name: "Very Poor", value: 2 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000"];

const CustomerGraph = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Appointments Over Time */}
      <div className="p-4 shadow rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Patient Appointments Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={appointmentData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="appointments" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Prescribed Medicines */}
      <div className="p-4 shadow rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Top Prescribed Medicines</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={medicineData}>
            <XAxis dataKey="medicine" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Patient Feedback */}
      <div className="p-4 shadow rounded-xl col-span-1 md:col-span-2">
        <h2 className="text-lg font-semibold mb-2">Patient Feedback Ratings</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={feedbackData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {feedbackData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerGraph;

