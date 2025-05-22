/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React from "react";
// import Image from "next/image";
// import { useGetDoctorsQuery,useDeleteDoctorMutation } from "@/redux/features/doctor/doctorSlice";
// import { Trash2, Pencil } from "lucide-react";
// import Link from "next/link";
// import DoctorModel from "@/components/modules/form/DoctorModel";

// const DoctorsAllPage = () => {
//   const { data, isLoading, isError } = useGetDoctorsQuery(undefined);

//   const doctors = data?.data || [];

//   const handleDelete = (id: string) => {
//     console.log("Delete doctor with id:", id);
//     // TODO: Call delete mutation here
//   };

//   const handleEdit = (id: string) => {
//     console.log("Edit doctor with id:", id);
//     // TODO: Redirect to update page, e.g. `/dashboard/admin/doctor/edit/${id}`
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error fetching doctors.</p>;

//   return (
//     <div className="p-4">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-semibold mb-4">All Doctors</h2>
//         <Link href="/dashboard/admin/doctors/add">
//           <button className="border-2 p-2 cursor-pointer">Add Doctor</button>
//         </Link>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200 text-left text-sm">
//           <thead className="bg-gray-100 text-gray-700">
//             <tr>
//               <th className="p-3 border">#</th>
//               <th className="p-3 border">Image</th>
//               <th className="p-3 border">Name</th>
//               <th className="p-3 border">Hospital</th>
//               <th className="p-3 border">Date</th>
//               <th className="p-3 border">Time</th>
//               <th className="p-3 border">Day</th>
//               <th className="p-3 border text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {doctors.map((doctor: any, index: number) => (
//               <tr
//                 key={doctor._id || index}
//                 className="border-t hover:bg-gray-50"
//               >
//                 <td className="p-3 border">{index + 1}</td>
//                 <td className="p-3 border">
//                   {doctor.image ? (
//                     <Image
//                       src={doctor.image}
//                       alt={doctor.name}
//                       width={40}
//                       height={40}
//                       className="rounded-full"
//                     />
//                   ) : (
//                     "N/A"
//                   )}
//                 </td>
//                 <td className="p-3 border">{doctor.name || "N/A"}</td>
//                 <td className="p-3 border">{doctor.hospital || "N/A"}</td>
//                 <td className="p-3 border">{doctor.date || "N/A"}</td>
//                 <td className="p-3 border">{doctor.time || "N/A"}</td>
//                 <td className="p-3 border">{doctor.day || "N/A"}</td>
//                 <td className="p-3 border   justify-between">
//                   <div className="flex items-center justify-center gap-5">
//                     <Pencil
//                       className="w-4 h-4 text-blue-600 cursor-pointer"
//                       onClick={() => handleEdit(doctor._id)}
//                     />
//                     <Trash2
//                       className="w-4 h-4 text-red-600 cursor-pointer"
//                       onClick={() => handleDelete(doctor._id)}
//                     />
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DoctorsAllPage;



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
  const { data, isLoading, isError } = useGetDoctorsQuery(undefined);
  const [deleteDoctor] = useDeleteDoctorMutation();

  const doctors = data?.data || [];

  // ✅ For modal state
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
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor: any, index: number) => (
              <tr key={doctor._id} className="border-t hover:bg-gray-600">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">
                  {doctor.image ? (
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="p-3 border">{doctor.name}</td>
                <td className="p-3 border">{doctor.hospital}</td>
                <td className="p-3 border">{doctor.date}</td>
                <td className="p-3 border">{doctor.time}</td>
                <td className="p-3 border">{doctor.day}</td>
                <td className="p-3 border text-center">
                  <div className="flex items-center justify-center gap-5">
                    <Pencil
                      className="w-4 h-4 text-blue-600 cursor-pointer"
                      onClick={() => handleEdit(doctor)}
                    />
                    <Trash2
                      className="w-4 h-4 text-red-600 cursor-pointer"
                      onClick={() => handleDelete(doctor._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ DoctorModel modal */}
      {isModalOpen && (
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
