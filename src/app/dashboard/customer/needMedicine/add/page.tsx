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
      className="max-w-2xl mx-auto mt-10 p-6 bg-[#0A0A0A] rounded-3xl border-2 shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-violet-600 dark:text-white">
        Add Medicine Request
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm text-gray-300">Medicine Name</label>
          <input
            type="text"
            name="medicineName"
            onChange={formik.handleChange}
            value={formik.values.medicineName}
            className="w-full p-2 border rounded"
            placeholder="e.g. Salbutamol Inhaler"
          />
          {formik.touched.medicineName && formik.errors.medicineName && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.medicineName}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-300">Need Date</label>
          <DatePicker
            className="w-full"
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
          <label className="block mb-1 text-sm text-gray-300">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            onChange={formik.handleChange}
            value={formik.values.contactNumber}
            className="w-full p-2 border rounded"
            placeholder="01XXXXXXXXX"
          />
          {formik.touched.contactNumber && formik.errors.contactNumber && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.contactNumber}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-300">Requester Name</label>
          <input
            type="text"
            name="requesterName"
            onChange={formik.handleChange}
            value={formik.values.requesterName}
            className="w-full p-2 border rounded"
            placeholder="e.g. Tanvir Hasan"
          />
          {formik.touched.requesterName && formik.errors.requesterName && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.requesterName}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-300">Location</label>
          <input
            type="text"
            name="location"
            onChange={formik.handleChange}
            value={formik.values.location}
            className="w-full p-2 border rounded"
            placeholder="e.g. Rajshahi, Bangladesh"
          />
          {formik.touched.location && formik.errors.location && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.location}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-300">Status</label>
          <Select
            value={formik.values.status}
            onChange={(value) => formik.setFieldValue("status", value)}
            className="w-full"
            options={[
              { label: "Pending", value: "pending" },
              { label: "Fulfilled", value: "fulfilled" },
            ]}
          />
          {formik.touched.status && formik.errors.status && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.status}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className="block mb-1 text-sm text-gray-300">Medicine Image</label>
        <Upload beforeUpload={handleImageUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />} loading={loading}>
            {loading ? "Uploading..." : "Upload Image"}
          </Button>
        </Upload>
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

      <div className="mt-6 text-center">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CreateMedicine;
