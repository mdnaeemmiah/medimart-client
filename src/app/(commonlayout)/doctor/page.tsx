/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetDoctorsQuery } from "@/redux/features/doctor/doctorSlice";
import Image from "next/image";

const DoctorsPage = () => {
  const { data, isLoading, isError } = useGetDoctorsQuery(undefined);

  const doctors = data?.data || [];

  if (isLoading) return <p className="text-center mt-10">Loading doctors...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load doctors.</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Doctors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
        {doctors.map((doctor: any) => (
          <div key={doctor._id} className="  rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] p-4 text-left">
            <Image
              src={doctor.image}
              alt={doctor.name}
              width={128}
              height={128}
              className="rounded-full object-cover mb-4 mx-auto"
            />
            <h3 className="text-xl font-semibold">{doctor.name}</h3>
            <p className="text-gray-600">🏥 {doctor.hospital}</p>
            <p className="text-gray-600">📅 {doctor.time}</p>
            <p className="text-gray-600">⏰ {doctor.date}</p>
            <p className="text-gray-600">⏰ {doctor.day}</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;
