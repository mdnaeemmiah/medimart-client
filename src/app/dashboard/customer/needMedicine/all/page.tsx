/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  useGetAllNeedMedicinesQuery,
  useDeleteNeedMedicineMutation,
  useUpdateNeedMedicineMutation,
} from "@/redux/features/needMedicine/needMedicineSlice";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Modal for editing medicine request
const EditMedicineModal = ({
  medicine,
  onClose,
}: {
  medicine: any;
  onClose: () => void;
}) => {
  const [updateNeedMedicine, { isLoading }] = useUpdateNeedMedicineMutation();

  const [formData, setFormData] = useState({
    medicineName: medicine.medicineName || "",
    needDate: medicine.needDate || "",
    contactNumber: medicine.contactNumber || "",
    requesterName: medicine.requesterName || "",
    location: medicine.location || "",
    notes: medicine.notes || "",
    status: medicine.status || "pending",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateNeedMedicine({ id: medicine._id, ...formData }).unwrap();
      toast.success("Medicine updated successfully");
      onClose();
    } catch {
      toast.error("Failed to update medicine");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Medicine Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="medicineName" value={formData.medicineName} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Medicine Name" required />
          <input name="needDate" value={formData.needDate} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Need Date" required />
          <input name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Contact Number" required />
          <input name="requesterName" value={formData.requesterName} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Requester Name" required />
          <input name="location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Location" required />
          <input name="notes" value={formData.notes} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Notes" />
          <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="pending">Pending</option>
            <option value="fulfilled">Fulfilled</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div className="flex justify-end gap-2">
            <button onClick={onClose} type="button" className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AddMedicinePage = () => {
  const { data, isLoading, isError, refetch } = useGetAllNeedMedicinesQuery(undefined);
  const [deleteNeedMedicine] = useDeleteNeedMedicineMutation();

  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this request?")) {
      try {
        await deleteNeedMedicine(id).unwrap();
        toast.success("Request deleted successfully");
      } catch {
        toast.error("Failed to delete request");
      }
    }
  };

  const openModal = (medicine: any) => {
    setSelectedMedicine(medicine);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMedicine(null);
    setModalOpen(false);
    refetch();
  };

  const medicines = data?.data || [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching medicines.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">All Medicine Requests</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-gray-600">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Medicine Name</th>
              <th className="p-3 border">Need Date</th>
              <th className="p-3 border">Requester</th>
              <th className="p-3 border">Contact</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med: any, idx: number) => (
              <tr key={med._id} className="border-t">
                <td className="p-3 border">{idx + 1}</td>
                <td className="p-3 border">{med.medicineName}</td>
                <td className="p-3 border">{med.needDate?.slice(0, 10)}</td>
                <td className="p-3 border">{med.requesterName}</td>
                <td className="p-3 border">{med.contactNumber}</td>
                <td className="p-3 border">{med.location}</td>
                <td className="p-3 border capitalize">{med.status}</td>
                <td className="p-3 border space-x-2">
                  <button onClick={() => openModal(med)} className="text-blue-600 hover:text-blue-800">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => handleDelete(med._id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && selectedMedicine && (
        <EditMedicineModal medicine={selectedMedicine} onClose={closeModal} />
      )}
    </div>
  );
};

export default AddMedicinePage;
