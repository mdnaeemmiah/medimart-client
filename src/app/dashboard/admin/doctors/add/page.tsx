"use client";

import { useCreateDoctorMutation } from "@/redux/features/doctor/doctorSlice";
import React, { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "", // ✅ Include image field
    hospital: "",
    date: "",
    time: "",
    day: "",
  });

  const [createDoctor, { isLoading, isSuccess, isError, error }] =
    useCreateDoctorMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createDoctor(formData).unwrap();
      console.log("Doctor created:", response);
    } catch (err) {
      console.error("Error creating doctor:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Doctor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block mb-1 capitalize">{key}</label>
            <input
              type="text"
              name={key}
              value={formData[key as keyof typeof formData]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}
        {formData.image && (
          <div>
            <p className="text-sm font-medium mb-1">Image Preview:</p>
            <img
              src={formData.image}
              alt="Doctor"
              className="w-32 h-32 object-cover rounded border"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
        {isSuccess && <p className="text-green-600 mt-2">Doctor added successfully!</p>}
        {isError && <p className="text-red-600 mt-2">Error: {(error as any)?.data?.message || "Something went wrong."}</p>}
      </form>
    </div>
  );
};

export default Page;
