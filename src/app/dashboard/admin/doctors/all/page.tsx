/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  useGetDoctorsQuery,
  useDeleteDoctorMutation,
  useUpdateDoctorMutation,
} from "@/redux/features/doctor/doctorSlice";
import { Trash2, Pencil } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
      <div className="dashboard-card w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Edit Doctor</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Update doctor availability and timing.
        </p>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Doctor name"
            className="dashboard-input w-full"
            required
          />
          <input
            type="text"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            placeholder="Hospital"
            className="dashboard-input w-full"
            required
          />
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Date"
            className="dashboard-input w-full"
            required
          />
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Time"
            className="dashboard-input w-full"
            required
          />
          <input
            type="text"
            name="day"
            value={formData.day}
            onChange={handleChange}
            placeholder="Day"
            className="dashboard-input w-full"
            required
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="muted-action rounded-full px-4 py-2 text-sm font-semibold"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className="primary-action rounded-full px-4 py-2 text-sm font-semibold"
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
    refetch();
  };

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4 text-red-500">Error fetching doctors.</p>;

  return (
    <div className="space-y-6 p-4">
      <section className="dashboard-card relative overflow-hidden p-6 md:p-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-emerald-500/25 via-sky-400/10 to-transparent" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-200">
              Doctors
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Doctor Directory</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Manage schedules, availability, and clinic assignments.
            </p>
          </div>
          <Link
            href="/dashboard/admin/doctors/add"
            className="primary-action inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold"
          >
            Add Doctor
          </Link>
        </div>
      </section>

      <section className="dashboard-card p-4 md:p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Hospital</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Day</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor: any, i: number) => (
                <tr key={doctor._id} className="border-t">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3">
                    {doctor.image ? (
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        width={44}
                        height={44}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-11 w-11 rounded-full bg-slate-200" />
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold">{doctor.name}</td>
                  <td className="px-4 py-3">{doctor.hospital}</td>
                  <td className="px-4 py-3">{doctor.date}</td>
                  <td className="px-4 py-3">{doctor.time}</td>
                  <td className="px-4 py-3">{doctor.day}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        className="text-emerald-600 hover:text-emerald-800"
                        onClick={() => handleEdit(doctor)}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        className="text-rose-600 hover:text-rose-800"
                        onClick={() => handleDelete(doctor._id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && editingDoctor && (
        <EditDoctorModal doctor={editingDoctor} onClose={closeModal} />
      )}
    </div>
  );
};

export default DoctorsAllPage;
