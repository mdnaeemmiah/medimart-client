/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Button, Upload, DatePicker, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import dayjs from "dayjs"; // ✅ Import dayjs
import { useCreateNeedMedicineMutation } from "@/redux/features/needMedicine/needMedicineSlice";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/db9egbkam/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "naeemmiah";

const validationSchema = Yup.object({
  medicineName: Yup.string().required("Medicine name is required"),
  needDate: Yup.string().required("Need date is required"),
  contactNumber: Yup.string()
    .required("Contact number is required")
    .matches(/^01[3-9]\d{8}$/, "Enter a valid Bangladeshi number"),
  requesterName: Yup.string().required("Requester name is required"),
  location: Yup.string().required("Location is required"),
  status: Yup.string().required("Status is required"),
});

const CreateMedicine = () => {
  const [createMedicine] = useCreateNeedMedicineMutation();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      medicineName: "",
      needDate: "",
      contactNumber: "",
      requesterName: "",
      location: "",
      status: "pending",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!imageUrl) {
        toast.error("Please upload a medicine image");
        return;
      }

      const toastId = toast.loading("Creating medicine...");

      const medicineData = {
        ...values,
        image: imageUrl,
      };

      try {
        await createMedicine(medicineData).unwrap();
        toast.success("Medicine created successfully", { id: toastId });
        resetForm();
        setImageUrl("");
      } catch (error) {
        toast.error("Failed to create medicine", { id: toastId });
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
      className="dashboard-card relative mx-auto mt-8 max-w-4xl overflow-hidden rounded-3xl p-6 md:p-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-sky-500/25 via-emerald-400/10 to-transparent" />
      <div className="mb-6 flex flex-col items-center text-center">
        <span className="rounded-full border border-sky-200/70 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700 shadow-sm dark:border-sky-400/30 dark:bg-slate-900/60 dark:text-sky-200">
          Medicine Request
        </span>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
          Add Medicine Request
        </h2>
        <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-300">
          Provide medicine details so we can process the request faster.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Medicine Name
          </label>
          <input
            type="text"
            name="medicineName"
            onChange={formik.handleChange}
            value={formik.values.medicineName}
            className="dashboard-input mt-2 w-full"
            placeholder="e.g. Salbutamol Inhaler"
          />
          {formik.touched.medicineName && formik.errors.medicineName && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.medicineName}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Need Date
          </label>
          <DatePicker
            className="dashboard-input mt-2 w-full"
            onChange={(date) => {
              const isoDate = date ? date.toISOString() : "";
              formik.setFieldValue("needDate", isoDate);
            }}
            value={formik.values.needDate ? dayjs(formik.values.needDate) : null}
          />
          {formik.touched.needDate && formik.errors.needDate && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.needDate}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Contact Number
          </label>
          <input
            type="text"
            name="contactNumber"
            onChange={formik.handleChange}
            value={formik.values.contactNumber}
            className="dashboard-input mt-2 w-full"
            placeholder="01XXXXXXXXX"
          />
          {formik.touched.contactNumber && formik.errors.contactNumber && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.contactNumber}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Requester Name
          </label>
          <input
            type="text"
            name="requesterName"
            onChange={formik.handleChange}
            value={formik.values.requesterName}
            className="dashboard-input mt-2 w-full"
            placeholder="e.g. Tanvir Hasan"
          />
          {formik.touched.requesterName && formik.errors.requesterName && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.requesterName}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Location
          </label>
          <input
            type="text"
            name="location"
            onChange={formik.handleChange}
            value={formik.values.location}
            className="dashboard-input mt-2 w-full"
            placeholder="e.g. Rajshahi, Bangladesh"
          />
          {formik.touched.location && formik.errors.location && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.location}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Status
          </label>
          <div className="dashboard-select-wrap mt-2">
            <Select
              value={formik.values.status}
              onChange={(value) => formik.setFieldValue("status", value)}
              className="dashboard-select w-full"
              options={[
                { label: "Pending", value: "pending" },
                { label: "Fulfilled", value: "fulfilled" },
              ]}
            />
          </div>
          {formik.touched.status && formik.errors.status && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.status}</p>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-sky-200/70 bg-gradient-to-br from-white/80 via-white/70 to-sky-50/60 p-4 shadow-sm dark:border-sky-400/20 dark:from-slate-900/70 dark:via-slate-900/60 dark:to-slate-950/70">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Medicine Image
        </label>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Upload beforeUpload={handleImageUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />} loading={loading} className="border-sky-200 text-sky-700">
              {loading ? "Uploading..." : "Upload Image"}
            </Button>
          </Upload>
          <p className="text-xs text-slate-500 dark:text-slate-400">JPG or PNG, up to 10MB.</p>
        </div>
        {imageUrl && (
          <div className="mt-4 text-center">
            <Image
              src={imageUrl}
              alt="Medicine"
              width={80}
              height={80}
              className="object-cover rounded border"
              style={{ borderColor: "#ddd" }}
            />
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 text-center">
        <Button type="primary" htmlType="submit" className="h-10 px-8 shadow-lg shadow-sky-500/20">
          Submit
        </Button>
        <p className="text-xs text-slate-500 dark:text-slate-400">We will review and respond shortly.</p>
      </div>
    </form>
  );
};

export default CreateMedicine;
