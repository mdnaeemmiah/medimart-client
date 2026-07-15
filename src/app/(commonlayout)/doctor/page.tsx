/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetDoctorsQuery } from "@/redux/features/doctor/doctorSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Hospital,
  Stethoscope,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";

const DoctorsPage = () => {
  const { data, isLoading, isError } = useGetDoctorsQuery(undefined);
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  const doctors = data?.data || [];

  const handleBookAppointment = (doctor: any) => {
    if (!user) {
      toast.error("Please login first.");
      router.push("/login");
      return;
    }

    setSelectedDoctor(doctor);
  };

  const handleConfirmAppointment = () => {
    if (!selectedDoctor) return;

    if (!user) {
      toast.error("Please login first.");
      setSelectedDoctor(null);
      router.push("/login");
      return;
    }

    const appointment = {
      id: `${selectedDoctor._id}-${selectedDoctor.date}-${selectedDoctor.time}`,
      doctorId: selectedDoctor._id,
      doctorName: selectedDoctor.name,
      hospital: selectedDoctor.hospital,
      date: selectedDoctor.date,
      time: selectedDoctor.time,
      day: selectedDoctor.day,
      bookedAt: new Date().toISOString(),
    };

    const savedAppointments = JSON.parse(
      localStorage.getItem("medimart-appointments") || "[]",
    );
    const isAlreadyBooked = savedAppointments.some(
      (item: { id: string }) => item.id === appointment.id,
    );

    if (isAlreadyBooked) {
      toast.warning("You already booked this appointment.");
      setSelectedDoctor(null);
      return;
    }

    localStorage.setItem(
      "medimart-appointments",
      JSON.stringify([...savedAppointments, appointment]),
    );
    toast.success(`Appointment confirmed with ${selectedDoctor.name}.`);
    setSelectedDoctor(null);
  };

  if (isLoading) return <p className="text-center mt-10">Loading doctors...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load doctors.</p>
    );

  return (
    <section className="section-shell py-16">
      <div className="mb-10 text-center">
        <p className="section-kicker">Clinical team</p>
        <h2 className="section-title mt-3">Our Doctors</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {doctors.map((doctor: any) => (
          <div
            key={doctor._id}
            className="surface-card rounded-lg p-5 text-left transition hover:-translate-y-1 hover:shadow-md"
          >
            <Image
              src={doctor.image}
              alt={doctor.name}
              width={128}
              height={128}
              className="mx-auto mb-5 size-32 rounded-full border-4 border-teal-50 object-cover dark:border-teal-400/10"
            />
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
              {doctor.name}
            </h3>
            <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <p className="flex items-center gap-2">
                <Hospital className="size-4 text-teal-600" /> {doctor.hospital}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="size-4 text-teal-600" /> {doctor.time}
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays className="size-4 text-teal-600" /> {doctor.date}
              </p>
              <p className="flex items-center gap-2">
                <Stethoscope className="size-4 text-teal-600" /> {doctor.day}
              </p>
            </div>
            <button
              onClick={() => handleBookAppointment(doctor)}
              className="primary-action mt-5 inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-lg px-4 font-semibold transition"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 px-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">Confirm appointment</p>
                <h3 className="mt-2 text-xl font-bold text-slate-950 dark:text-white">
                  Do you want to book this appointment?
                </h3>
              </div>
              <button
                onClick={() => setSelectedDoctor(null)}
                className="grid size-9 cursor-pointer place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:text-white"
                aria-label="Close appointment confirmation"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <p className="font-semibold text-slate-950 dark:text-white">
                {selectedDoctor.name}
              </p>
              <p className="mt-2 flex items-center gap-2">
                <Hospital className="size-4 text-teal-600" />{" "}
                {selectedDoctor.hospital}
              </p>
              <p className="mt-2 flex items-center gap-2">
                <CalendarDays className="size-4 text-teal-600" />{" "}
                {selectedDoctor.date} ({selectedDoctor.day})
              </p>
              <p className="mt-2 flex items-center gap-2">
                <Clock className="size-4 text-teal-600" /> {selectedDoctor.time}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="muted-action inline-flex h-11 flex-1 cursor-pointer items-center justify-center rounded-lg px-4 font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAppointment}
                className="primary-action inline-flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 font-semibold transition"
              >
                <CheckCircle2 className="size-4" />
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DoctorsPage;
