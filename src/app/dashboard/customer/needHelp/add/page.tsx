/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import axios from "axios";
import { useCreateHelpRequestMutation } from "@/redux/features/needHelp/needHelpSlice";
import Image from "next/image";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/db9egbkam/auto/upload";
const CLOUDINARY_UPLOAD_PRESET = "naeemmiah";

const validationSchema = Yup.object({
  patientName: Yup.string().required("Patient name is required"),
  disease: Yup.string().required("Disease is required"),
  duration: Yup.string().required("Duration is required"),
  medicinesTaken: Yup.string().required("Medicines taken are required"),
  report: Yup.string().required("Report is required"),
});

const CreateHelpRequest = () => {
  const [createHelpRequest] = useCreateHelpRequestMutation();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      patientName: "",
      disease: "",
      duration: "",
      medicinesTaken: "",
      report: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!imageUrl || !videoUrl) {
        toast.error("Please upload both image and video");
        return;
      }

      const toastId = toast.loading("Submitting help request...");

      const helpRequestData = {
        ...values,
        medicinesTaken: values.medicinesTaken.split(",").map((m) => m.trim()),
        image: imageUrl,
        video: videoUrl,
      };

      try {
        await createHelpRequest(helpRequestData).unwrap();
        toast.success("Help request submitted successfully", { id: toastId });
        resetForm();
        setImageUrl("");
        setVideoUrl("");
      } catch (error) {
        toast.error("Failed to submit help request", { id: toastId });
      }
    },
  });

  const handleUpload = async (file: File, type: "image" | "video") => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      if (type === "image") {
        setImageUrl(response.data.secure_url);
        toast.success("Image uploaded successfully");
      } else {
        setVideoUrl(response.data.secure_url);
        toast.success("Video uploaded successfully");
      }
    } catch {
      toast.error(`${type === "image" ? "Image" : "Video"} upload failed`);
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
          Patient Support
        </span>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
          Add Help Request
        </h2>
        <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-300">
          Share patient details so our care team can respond quickly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Patient Name
          </label>
          <Input
            name="patientName"
            onChange={formik.handleChange}
            value={formik.values.patientName}
            placeholder="e.g. Michael Johnson"
            className="dashboard-input mt-2"
          />
          {formik.touched.patientName && formik.errors.patientName && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.patientName}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Disease
          </label>
          <Input
            name="disease"
            onChange={formik.handleChange}
            value={formik.values.disease}
            placeholder="e.g. Chronic Kidney Disease"
            className="dashboard-input mt-2"
          />
          {formik.touched.disease && formik.errors.disease && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.disease}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Duration
          </label>
          <Input
            name="duration"
            onChange={formik.handleChange}
            value={formik.values.duration}
            placeholder="e.g. 2 years"
            className="dashboard-input mt-2"
          />
          {formik.touched.duration && formik.errors.duration && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.duration}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Medicines Taken
          </label>
          <Input
            name="medicinesTaken"
            onChange={formik.handleChange}
            value={formik.values.medicinesTaken}
            placeholder="e.g. Furosemide, Lisinopril"
            className="dashboard-input mt-2"
          />
          {formik.touched.medicinesTaken && formik.errors.medicinesTaken && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.medicinesTaken}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Report
        </label>
        <textarea
          name="report"
          onChange={formik.handleChange}
          value={formik.values.report}
          className="dashboard-textarea mt-2 min-h-[130px] w-full"
          placeholder="e.g. Patient requires ongoing dialysis; kidney function stable."
        />
        {formik.touched.report && formik.errors.report && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.report}</p>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-sky-200/70 bg-gradient-to-br from-white/80 via-white/70 to-sky-50/60 p-4 shadow-sm dark:border-sky-400/20 dark:from-slate-900/70 dark:via-slate-900/60 dark:to-slate-950/70">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Upload Patient Image
        </label>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Upload beforeUpload={(file) => handleUpload(file, "image")} showUploadList={false}>
            <Button icon={<UploadOutlined />} loading={loading} className="border-sky-200 text-sky-700">
              {loading ? "Uploading..." : "Upload Image"}
            </Button>
          </Upload>
          <p className="text-xs text-slate-500 dark:text-slate-400">JPG or PNG, up to 10MB.</p>
        </div>
        {imageUrl && (
          <div className="mt-3">
            <Image src={imageUrl} alt="Patient" width={100} height={100} className="rounded border" />
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-sky-200/70 bg-gradient-to-br from-white/80 via-white/70 to-emerald-50/60 p-4 shadow-sm dark:border-sky-400/20 dark:from-slate-900/70 dark:via-slate-900/60 dark:to-slate-950/70">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Upload Medical Report Video
        </label>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Upload beforeUpload={(file) => handleUpload(file, "video")} showUploadList={false}>
            <Button icon={<UploadOutlined />} loading={loading} className="border-sky-200 text-sky-700">
              {loading ? "Uploading..." : "Upload Video"}
            </Button>
          </Upload>
          <p className="text-xs text-slate-500 dark:text-slate-400">MP4 preferred, up to 50MB.</p>
        </div>
        {videoUrl && (
          <video controls className="mt-3 w-full max-w-md rounded border">
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 text-center">
        <Button type="primary" htmlType="submit" className="h-10 px-8 shadow-lg shadow-sky-500/20">
          Submit Request
        </Button>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          You will receive a notification after review.
        </p>
      </div>
    </form>
  );
};

export default CreateHelpRequest;
