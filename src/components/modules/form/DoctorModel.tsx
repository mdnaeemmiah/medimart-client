/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUpdateDoctorMutation } from "@/redux/features/doctor/doctorSlice";
import { toast } from "sonner";
import Image from "next/image";

interface DoctorModelProps {
  visible: boolean;
  doctor: any;
  onClose: () => void;
}

const DoctorModel: React.FC<DoctorModelProps> = ({
  visible,
  doctor,
  onClose,
}) => {
  const [updateDoctor] = useUpdateDoctorMutation();
  const [previewImage, setPreviewImage] = useState<string>(doctor?.image || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!visible || !doctor) return null;

  const initialValues = {
    name: doctor.name || "",
    hospital: doctor.hospital || "",
    date: doctor.date || "",
    time: doctor.time || "",
    day: doctor.day || "",
    image: doctor.image || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    hospital: Yup.string().required("Hospital is required"),
    date: Yup.string().required("Date is required"),
    time: Yup.string().required("Time is required"),
    day: Yup.string().required("Day is required"),
  });

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFieldValue: any
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFieldValue("image", file); // store File object instead of base64
    }
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("hospital", values.hospital);
      formData.append("date", values.date);
      formData.append("time", values.time);
      formData.append("day", values.day);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      await updateDoctor({ id: doctor._id, body: formData }).unwrap();
      toast.success("Doctor updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update doctor");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="border-2 p-6 rounded-lg w-full max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-red-600 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit Doctor</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">
              {["name", "hospital", "date", "time", "day"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium capitalize">
                    {field}
                  </label>
                  <Field
                    type="text"
                    name={field}
                    className="w-full border px-3 py-2 rounded mt-1"
                  />
                  <ErrorMessage
                    name={field}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium">Image</label>
                {previewImage && (
                  <Image
                    src={previewImage}
                    alt="Preview"
                    width={80}
                    height={80}
                    className="rounded-full object-cover mb-2"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                  className="w-full"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 border rounded"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Update
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DoctorModel;
