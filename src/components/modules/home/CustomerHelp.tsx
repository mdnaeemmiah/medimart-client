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
    return <p className="text-center text-red-500 mt-10">Failed to load help requests.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
      {data?.data?.map((item: any, index: number) => (
        <div
          key={index}
          className="bg-white dark:bg-[#0f0f0f] border border-gray-300 dark:border-gray-700 rounded-xl shadow p-4 flex flex-col gap-3"
        >
          <Image
            src={item.image}
            alt={item.patientName}
            width={400}
            height={200}
            className="w-full h-48 object-cover rounded-md"
          />

          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {item.patientName}
          </h2>

          <p className="text-gray-600 dark:text-gray-300">
            <strong>Disease:</strong> {item.disease}
          </p>

          <p className="text-gray-600 dark:text-gray-300">
            <strong>Duration:</strong> {item.duration}
          </p>

          <p className="text-gray-600 dark:text-gray-300">
            <strong>Medicines:</strong>{" "}
            {item.medicinesTaken?.join(", ") || "N/A"}
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            <strong>Report:</strong> {item.report}
          </p>

          <video controls className="w-full rounded-md border mt-2">
            <source src={item.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <p className="text-xs text-gray-500 mt-2">
            <strong>Created:</strong> {moment(item.createdAt).format("LLL")}
          </p>

          <p className="text-xs text-gray-500">
            <strong>Updated:</strong> {moment(item.updatedAt).format("LLL")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CustomerHelp;
