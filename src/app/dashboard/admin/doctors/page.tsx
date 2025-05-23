/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  useGetDoctorsQuery,
  useDeleteDoctorMutation,
  useUpdateDoctorMutation
} from "@/redux/features/doctor/doctorSlice";
import { Trash2, Pencil } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// Modal Component for Editing
const EditDoctorModal = ({
  doctor,
  onClose,
}: {
  doctor: any;
  onClose: () => void;
}) => {
  const [updateDoctor, { isLoading: updating }] = useUpdateDoctorMutation();

  const [formData, setFormData] = useState({
    name: doctor.name || "",
    hospital: doctor.hospital || "",
    date: doctor.date || "",
    time: doctor.time || "",
    day: doctor.day || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateDoctor({ id: doctor._id, body: formData }).unwrap();
      toast.success("Doctor updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update doctor");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="border-2 rounded p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Doctor</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Doctor Name"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            placeholder="Hospital"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Date"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Time"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="day"
            value={formData.day}
            onChange={handleChange}
            placeholder="Day"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {updating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DoctorsAllPage = () => {
  const { data, isLoading, isError, refetch } = useGetDoctorsQuery(undefined);
  const [deleteDoctor] = useDeleteDoctorMutation();

  const doctors = data?.data || [];

  const [editingDoctor, setEditingDoctor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this doctor?")) {
      try {
        await deleteDoctor(id).unwrap();
        toast.success("Doctor deleted successfully");
      } catch {
        toast.error("Failed to delete doctor");
      }
    }
  };

  const handleEdit = (doctor: any) => {
    setEditingDoctor(doctor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingDoctor(null);
    setIsModalOpen(false);
    refetch(); // refetch doctors list to update UI after modal close
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching doctors.</p>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold mb-4">All Doctors</h2>
        <Link href="/dashboard/admin/doctors/add">
          <button className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition">
            Add Doctor
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-left text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Hospital</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Time</th>
              <th className="p-3 border">Day</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor: any, i: any) => (
              <tr key={doctor._id} className="border-t">
                <td className="p-3 border">{i + 1}</td>
                <td className="p-3 border w-20">
                  {doctor.image ? (
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded-full" />
                  )}
                </td>
                <td className="p-3 border">{doctor.name}</td>
                <td className="p-3 border">{doctor.hospital}</td>
                <td className="p-3 border">{doctor.date}</td>
                <td className="p-3 border">{doctor.time}</td>
                <td className="p-3 border">{doctor.day}</td>
                <td className="p-3 border space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleEdit(doctor)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(doctor._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && editingDoctor && (
        <EditDoctorModal doctor={editingDoctor} onClose={closeModal} />
      )}
    </div>
  );
};

export default DoctorsAllPage;
