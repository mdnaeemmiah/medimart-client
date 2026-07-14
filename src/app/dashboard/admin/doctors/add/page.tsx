/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import {
  Button,
  Upload,
  DatePicker,
  TimePicker,
  Input,
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
      className="dashboard-card relative mx-auto mt-8 max-w-3xl overflow-hidden p-6 md:p-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-emerald-500/25 via-sky-400/10 to-transparent" />
      <div className="mb-6 flex flex-col items-center text-center">
        <span className="rounded-full border border-emerald-200/70 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 shadow-sm dark:border-emerald-400/30 dark:bg-slate-900/60 dark:text-emerald-200">
          Doctor Desk
        </span>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Add Doctor</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Publish appointment availability and a verified profile photo.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Name</label>
          <Input
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="dashboard-input mt-2"
            placeholder="Doctor name"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Hospital</label>
          <Input
            name="hospital"
            onChange={formik.handleChange}
            value={formik.values.hospital}
            className="dashboard-input mt-2"
            placeholder="Hospital name"
          />
          {formik.touched.hospital && formik.errors.hospital && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.hospital}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Date</label>
          <DatePicker
            className="dashboard-input mt-2 w-full"
            onChange={(date, dateString) => formik.setFieldValue("date", dateString)}
          />
          {formik.touched.date && formik.errors.date && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.date}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Time</label>
          <TimePicker
            use12Hours
            format="h:mm A"
            className="dashboard-input mt-2 w-full"
            onChange={(time, timeString) => formik.setFieldValue("time", timeString)}
          />
          {formik.touched.time && formik.errors.time && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.time}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Day</label>
          <Input
            name="day"
            onChange={formik.handleChange}
            value={formik.values.day}
            className="dashboard-input mt-2"
            placeholder="Day (e.g., Monday)"
          />
          {formik.touched.day && formik.errors.day && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.day}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Doctor Image</label>
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <Upload beforeUpload={handleImageUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />} loading={loading} className="h-10">
              {loading ? "Uploading..." : "Upload Image"}
            </Button>
          </Upload>
          {imageUrl && (
            <div className="rounded-2xl border border-slate-200/60 bg-white/70 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-slate-900/60">
              <Image
                src={imageUrl}
                alt="Doctor"
                width={72}
                height={72}
                className="rounded-xl object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 text-center">
        <Button type="primary" htmlType="submit" className="h-10 px-8 shadow-lg shadow-emerald-500/20">
          Submit
        </Button>
        <p className="text-xs text-slate-500 dark:text-slate-400">Your doctor profile goes live immediately.</p>
      </div>
    </form>
  );
};

export default CreateDoctor;
