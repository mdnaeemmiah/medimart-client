/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  useDeleteMedicineMutation,
  useGetMedicinesQuery,
  useUpdateMedicineMutation,
} from "@/redux/features/medicine/medicineSlice";
import { Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";

// Edit Modal Component
const EditMedicineModal = ({
  medicine,
  onClose,
}: {
  medicine: any;
  onClose: () => void;
}) => {
  const [updateMedicine, { isLoading: updating }] = useUpdateMedicineMutation();

  const [formData, setFormData] = useState({
    name: medicine.name || "",
    manufacturer: medicine.manufacturer || "",
    price: medicine.price || "",
    stock: medicine.stock || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMedicine({ id: medicine._id, body: formData }).unwrap();
      toast.success("Medicine updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update medicine");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="border-2 rounded p-6 w-full max-w-md shadow-lg bg-white">
        <h2 className="text-lg font-semibold mb-4">Edit Medicine</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Medicine Name"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            placeholder="Manufacturer"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
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

const AllMedicinePage = () => {
  const { data, isLoading, isError, refetch } = useGetMedicinesQuery(undefined);
  const [deleteMedicine] = useDeleteMedicineMutation();
  console.log("medicines", data);

  const medicines = data?.data || [];

  const [editingMedicine, setEditingMedicine] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this medicine?")) {
      try {
        await deleteMedicine(id).unwrap();
        toast.success("Medicine deleted successfully");
      } catch {
        toast.error("Failed to delete medicine");
      }
    }
  };

  const handleEdit = (medicine: any) => {
    setEditingMedicine(medicine);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingMedicine(null);
    setIsModalOpen(false);
    refetch();
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching medicines.</p>;

  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-4">All Medicines</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-left text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Manufacturer</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Stock</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine: any, i: number) => (
              <tr key={medicine._id} className="border-t">
                <td className="p-3 border">{i + 1}</td>
                <td className="p-3 border">{medicine.name}</td>
                <td className="p-3 border">{medicine.manufacturer}</td>
                <td className="p-3 border">{medicine.price}</td>
                <td className="p-3 border">{medicine.stock}</td>
                <td className="p-3 border space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleEdit(medicine)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(medicine._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && editingMedicine && (
        <EditMedicineModal medicine={editingMedicine} onClose={closeModal} />
      )}
    </div>
  );
};

export default AllMedicinePage;
