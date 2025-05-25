"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import {
  useGetHelpRequestsQuery,
  useDeleteHelpRequestMutation,
  useUpdateHelpRequestMutation,
} from "@/redux/features/needHelp/needHelpSlice";
import { Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

// Edit Modal Component
const EditHelpModal = ({
  helpRequest,
  onClose,
}: {
  helpRequest: any;
  onClose: () => void;
}) => {
  const [updateHelpRequest, { isLoading }] = useUpdateHelpRequestMutation();
  const [formData, setFormData] = useState({
    patientName: helpRequest.patientName || "",
    disease: helpRequest.disease || "",
    duration: helpRequest.duration || "",
    report: helpRequest.report || "",
    medicinesTaken: helpRequest.medicinesTaken.join(", ") || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateHelpRequest({
        id: helpRequest._id,
        body: {
          ...formData,
          medicinesTaken: formData.medicinesTaken.split(",").map((m) => m.trim()),
        },
      }).unwrap();
      toast.success("Help request updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update help request");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Help Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Patient Name"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="disease"
            value={formData.disease}
            onChange={handleChange}
            placeholder="Disease"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="report"
            value={formData.report}
            onChange={handleChange}
            placeholder="Report"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="medicinesTaken"
            value={formData.medicinesTaken}
            onChange={handleChange}
            placeholder="Medicines (comma separated)"
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AllNeedHelpPage = () => {
  const { data, isLoading, isError, refetch } = useGetHelpRequestsQuery(undefined);
  const [deleteHelpRequest] = useDeleteHelpRequestMutation();
  const [editingRequest, setEditingRequest] = useState<any>(null);

  const helpRequests = data?.data || [];

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this request?")) {
      try {
        await deleteHelpRequest(id).unwrap();
        toast.success("Help request deleted");
      } catch {
        toast.error("Failed to delete request");
      }
    }
  };

  const openEditModal = (request: any) => setEditingRequest(request);
  const closeEditModal = () => {
    setEditingRequest(null);
    refetch();
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading help requests.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">All Help Requests</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200 text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Disease</th>
              <th className="p-3 border">Duration</th>
              <th className="p-3 border">Medicines</th>
              <th className="p-3 border">Report</th>
              <th className="p-3 border">Video</th>
              <th className="p-3 border">Created</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {helpRequests.map((req: any, i: number) => (
              <tr key={req._id} className="border-t">
                <td className="p-3 border">{i + 1}</td>
                <td className="p-3 border w-20">
                  {req.image ? (
                    <Image
                      src={req.image}
                      alt={req.patientName}
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded-full" />
                  )}
                </td>
                <td className="p-3 border">{req.patientName}</td>
                <td className="p-3 border">{req.disease}</td>
                <td className="p-3 border">{req.duration}</td>
                <td className="p-3 border">
                  {req.medicinesTaken?.join(", ") || "N/A"}
                </td>
                <td className="p-3 border max-w-xs truncate">{req.report}</td>
                <td className="p-3 border">
                  <a
                    href={req.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Video
                  </a>
                </td>
                <td className="p-3 border">
                  {new Date(req.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 border space-x-2">
                  <button
                    onClick={() => openEditModal(req)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingRequest && (
        <EditHelpModal helpRequest={editingRequest} onClose={closeEditModal} />
      )}
    </div>
  );
};

export default AllNeedHelpPage;
