/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import {
  Button,
  Upload,
  DatePicker,
  TimePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import { useCreateDoctorMutation } from "@/redux/features/doctor/doctorSlice";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/db9egbkam/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "naeemmiah";

const validationSchema = Yup.object({
  name: Yup.string().required("Doctor name is required"),
  hospital: Yup.string().required("Hospital is required"),
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
  day: Yup.string().required("Day is required"),
});

const CreateDoctor = () => {
  const [createDoctor] = useCreateDoctorMutation();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      hospital: "",
      date: "",
      time: "",
      day: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!imageUrl) {
        toast.error("Please upload a doctor image");
        return;
      }

      const toastId = toast.loading("Creating doctor...");

      const doctorData = {
        ...values,
        image: imageUrl,
      };

      try {
        await createDoctor(doctorData).unwrap();
        toast.success("Doctor created successfully", { id: toastId });
        resetForm();
        setImageUrl("");
      } catch (error) {
        toast.error("Failed to create doctor", { id: toastId });
      }
    },
  });

  const handleImageUpload = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageUrl(response.data.secure_url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setLoading(false);
    }
    return false;
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-2xl mx-auto mt-10 p-6  bg-[#0A0A0A] rounded-3xl border-2 shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-violet-600 dark:text-white">Add Doctor</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm  dark:text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-full p-2 border rounded"
            placeholder="Doctor name"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm  dark:text-gray-300">Hospital</label>
          <input
            type="text"
            name="hospital"
            onChange={formik.handleChange}
            value={formik.values.hospital}
            className="w-full p-2 border rounded"
            placeholder="Hospital name"
          />
          {formik.touched.hospital && formik.errors.hospital && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.hospital}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm  dark:text-gray-300">Date</label>
          <DatePicker
            className="w-full"
            onChange={(date, dateString) => formik.setFieldValue("date", dateString)}
          />
          {formik.touched.date && formik.errors.date && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.date}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm  dark:text-gray-300">Time</label>
          <TimePicker
            use12Hours
            format="h:mm A"
            className="w-full"
            onChange={(time, timeString) => formik.setFieldValue("time", timeString)}
          />
          {formik.touched.time && formik.errors.time && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.time}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-sm  dark:text-gray-300">Day</label>
          <input
            type="text"
            name="day"
            onChange={formik.handleChange}
            value={formik.values.day}
            className="w-full p-2 border rounded"
            placeholder="Day (e.g., Monday)"
          />
          {formik.touched.day && formik.errors.day && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.day}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className="block mb-1 text-sm  dark:text-gray-300">Doctor Image</label>
        <Upload beforeUpload={handleImageUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />} loading={loading}>
            {loading ? "Uploading..." : "Upload Image"}
          </Button>
        </Upload>
        {imageUrl && (
          <div className="mt-4 text-center">
            <Image
              src={imageUrl}
              alt="Doctor"
              width={80}
              height={80}
              className="object-cover rounded border"
              style={{ borderColor: "#ddd" }}
            />
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CreateDoctor;
