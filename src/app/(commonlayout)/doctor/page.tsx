/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetDoctorsQuery } from "@/redux/features/doctor/doctorSlice";
import Image from "next/image";
import { CalendarDays, Clock, Hospital, Stethoscope } from "lucide-react";

const DoctorsPage = () => {
  const { data, isLoading, isError } = useGetDoctorsQuery(undefined);

  const doctors = data?.data || [];

  if (isLoading) return <p className="text-center mt-10">Loading doctors...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load doctors.</p>;

  return (
    <section className="section-shell py-16">
      <div className="mb-10 text-center">
        <p className="section-kicker">Clinical team</p>
        <h2 className="section-title mt-3">Our Doctors</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {doctors.map((doctor: any) => (
          <div key={doctor._id} className="surface-card rounded-lg p-5 text-left transition hover:-translate-y-1 hover:shadow-md">
            <Image
              src={doctor.image}
              alt={doctor.name}
              width={128}
              height={128}
              className="mx-auto mb-5 size-32 rounded-full border-4 border-teal-50 object-cover dark:border-teal-400/10"
            />
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{doctor.name}</h3>
            <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <p className="flex items-center gap-2"><Hospital className="size-4 text-teal-600" /> {doctor.hospital}</p>
              <p className="flex items-center gap-2"><Clock className="size-4 text-teal-600" /> {doctor.time}</p>
              <p className="flex items-center gap-2"><CalendarDays className="size-4 text-teal-600" /> {doctor.date}</p>
              <p className="flex items-center gap-2"><Stethoscope className="size-4 text-teal-600" /> {doctor.day}</p>
            </div>
            <button className="primary-action mt-5 inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-lg px-4 font-semibold transition">
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DoctorsPage;
