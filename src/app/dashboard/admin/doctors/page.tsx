/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  useGetDoctorsQuery,
  useDeleteDoctorMutation,
} from "@/redux/features/doctor/doctorSlice";
import { Trash2, Pencil } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import DoctorModel from "@/components/modules/form/DoctorModel";

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
            {doctors.map((doctor:any, i:any) => (
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

      {/* Edit Doctor Modal */}
      {editingDoctor && (
        <DoctorModel
          visible={isModalOpen}
          doctor={editingDoctor}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default DoctorsAllPage;
