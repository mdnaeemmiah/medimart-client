/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetHelpRequestsQuery } from "@/redux/features/needHelp/needHelpSlice";
import React from "react";
import Image from "next/image";
import moment from "moment";
import { Spin } from "antd";

const CustomerHelp = () => {
  const { data, isLoading, isError } = useGetHelpRequestsQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load help requests.
      </p>
    );
  }

  return (
    <section className="section-shell py-16">
      <div className="mb-8 text-center">
        <p className="section-kicker">Patient support</p>
        <h2 className="section-title mt-3">Customer Help Requests</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data?.data?.map((item: any, index: number) => (
          <div
            key={index}
            className="surface-card flex flex-col gap-3 overflow-hidden rounded-lg p-4 transition hover:-translate-y-1 hover:shadow-md"
          >
            <Image
              src={item.image}
              alt={item.patientName}
              width={400}
              height={200}
              className="h-48 w-full rounded-md object-cover"
            />

            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
              {item.patientName}
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong>Disease:</strong> {item.disease}
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong>Duration:</strong> {item.duration}
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong>Medicines:</strong>{" "}
              {item.medicinesTaken?.join(", ") || "N/A"}
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong>Report:</strong> {item.report}
            </p>

            <video controls className="mt-2 w-full rounded-md border border-slate-200 dark:border-white/10">
              <source src={item.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <p className="mt-2 text-xs text-slate-500">
              <strong>Created:</strong> {moment(item.createdAt).format("LLL")}
            </p>

            <p className="text-xs text-slate-500">
              <strong>Updated:</strong> {moment(item.updatedAt).format("LLL")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerHelp;
