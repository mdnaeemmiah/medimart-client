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
      className="max-w-3xl mx-auto mt-10 p-6 bg-[#0A0A0A] rounded-3xl border-2 shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-violet-600 dark:text-white">
        Add Help Request
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-300">Patient Name</label>
          <Input
            name="patientName"
            onChange={formik.handleChange}
            value={formik.values.patientName}
            placeholder="e.g. Michael Johnson"
          />
          {formik.touched.patientName && formik.errors.patientName && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.patientName}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-300">Disease</label>
          <Input
            name="disease"
            onChange={formik.handleChange}
            value={formik.values.disease}
            placeholder="e.g. Chronic Kidney Disease"
          />
          {formik.touched.disease && formik.errors.disease && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.disease}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-300">Duration</label>
          <Input
            name="duration"
            onChange={formik.handleChange}
            value={formik.values.duration}
            placeholder="e.g. 2 years"
          />
          {formik.touched.duration && formik.errors.duration && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.duration}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-300">Medicines Taken</label>
          <Input
            name="medicinesTaken"
            onChange={formik.handleChange}
            value={formik.values.medicinesTaken}
            placeholder="e.g. Furosemide, Lisinopril"
          />
          {formik.touched.medicinesTaken && formik.errors.medicinesTaken && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.medicinesTaken}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm text-gray-300">Report</label>
        <textarea
          name="report"
          onChange={formik.handleChange}
          value={formik.values.report}
          className="w-full p-2 border rounded mt-1"
          placeholder="e.g. Patient requires ongoing dialysis; kidney function stable."
        />
        {formik.touched.report && formik.errors.report && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.report}</p>
        )}
      </div>

      <div className="mt-4">
        <label className="text-sm text-gray-300">Upload Patient Image</label>
        <Upload beforeUpload={(file) => handleUpload(file, "image")} showUploadList={false}>
          <Button icon={<UploadOutlined />} loading={loading}>
            {loading ? "Uploading..." : "Upload Image"}
          </Button>
        </Upload>
        {imageUrl && (
          <div className="mt-3">
            <Image src={imageUrl} alt="Patient" width={100} height={100} className="rounded border" />
          </div>
        )}
      </div>

      <div className="mt-4">
        <label className="text-sm text-gray-300">Upload Medical Report Video</label>
        <Upload beforeUpload={(file) => handleUpload(file, "video")} showUploadList={false}>
          <Button icon={<UploadOutlined />} loading={loading}>
            {loading ? "Uploading..." : "Upload Video"}
          </Button>
        </Upload>
        {videoUrl && (
          <video controls className="mt-3 w-full max-w-md rounded border">
            <source src={videoUrl} type="video/mp4" />
          </video>
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

export default CreateHelpRequest;
