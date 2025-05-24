/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Button, Input, Switch, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import axios from "axios";
import { useCreateMedicineMutation } from "@/redux/features/medicine/medicineSlice";

// const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/db9egbkam/image/upload";
// const CLOUDINARY_UPLOAD_PRESET = "naeemmiah";

const validationSchema = Yup.object({
  name: Yup.string().required("Medicine name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  stock: Yup.number().required("Stock is required"),
  requiresPrescription: Yup.boolean().required(),
  manufacturerName: Yup.string().required("Manufacturer name is required"),
  manufacturerAddress: Yup.string(),
  manufacturerContact: Yup.string(),
  expiryDate: Yup.string().required("Expiry date is required"),
});

const AddMedicine = () => {
  const [createMedicine] = useCreateMedicineMutation();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      requiresPrescription: false,
      manufacturerName: "",
      manufacturerAddress: "",
      manufacturerContact: "",
      expiryDate: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const toastId = toast.loading("Creating medicine...");

      const medicineData = {
        name: values.name,
        description: values.description,
        price: values.price,
        stock: values.stock,
        requiresPrescription: values.requiresPrescription,
        manufacturer: {
          name: values.manufacturerName,
          address: values.manufacturerAddress || undefined,
          contact: values.manufacturerContact || undefined,
        },
        expiryDate: values.expiryDate,
        image: imageUrl || undefined,
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

//   const handleImageUpload = async (file: File) => {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

//     try {
//       const response = await axios.post(CLOUDINARY_URL, formData);
//       setImageUrl(response.data.secure_url);
//       toast.success("Image uploaded");
//     } catch (error) {
//       toast.error("Image upload failed");
//     } finally {
//       setLoading(false);
//     }
//     return false;
//   };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-2xl mx-auto mt-10 p-6 bg-[#0A0A0A] rounded-3xl border-2 shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-violet-600 dark:text-white">
        Add Medicine
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm dark:text-gray-300">Name</label>
          <Input name="name" value={formik.values.name} onChange={formik.handleChange} />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label className="text-sm dark:text-gray-300">Description</label>
          <Input name="description" value={formik.values.description} onChange={formik.handleChange} />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-xs">{formik.errors.description}</p>
          )}
        </div>

        <div>
          <label className="text-sm dark:text-gray-300">Price ($)</label>
          <Input
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          {formik.touched.price && formik.errors.price && (
            <p className="text-red-500 text-xs">{formik.errors.price}</p>
          )}
        </div>

        <div>
          <label className="text-sm dark:text-gray-300">Stock</label>
          <Input
            type="number"
            name="stock"
            value={formik.values.stock}
            onChange={formik.handleChange}
          />
          {formik.touched.stock && formik.errors.stock && (
            <p className="text-red-500 text-xs">{formik.errors.stock}</p>
          )}
        </div>

        {/* <div className="md:col-span-2 flex items-center gap-3">
          <label className="text-sm dark:text-gray-300">Requires Prescription?</label>
          <Switch
            checked={formik.values.requiresPrescription}
            onChange={(checked) => formik.setFieldValue("requiresPrescription", checked)}
          />
        </div> */}

        <div>
          <label className="text-sm dark:text-gray-300">Manufacturer Name</label>
          <Input name="manufacturerName" value={formik.values.manufacturerName} onChange={formik.handleChange} />
          {formik.touched.manufacturerName && formik.errors.manufacturerName && (
            <p className="text-red-500 text-xs">{formik.errors.manufacturerName}</p>
          )}
        </div>

        <div>
          <label className="text-sm dark:text-gray-300">Manufacturer Address</label>
          <Input name="manufacturerAddress" value={formik.values.manufacturerAddress} onChange={formik.handleChange} />
        </div>

        <div>
          <label className="text-sm dark:text-gray-300">Manufacturer Contact</label>
          <Input name="manufacturerContact" value={formik.values.manufacturerContact} onChange={formik.handleChange} />
        </div>

        <div>
          <label className="text-sm dark:text-gray-300">Expiry Date</label>
          <DatePicker
            className="w-full"
            onChange={(date, dateString) => formik.setFieldValue("expiryDate", dateString)}
          />
          {formik.touched.expiryDate && formik.errors.expiryDate && (
            <p className="text-red-500 text-xs">{formik.errors.expiryDate}</p>
          )}
        </div>
      </div>

      {/* <div className="mt-4">
        <label className="text-sm dark:text-gray-300">Medicine Image (optional)</label>
        <Upload beforeUpload={handleImageUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />} loading={loading}>
            {loading ? "Uploading..." : "Upload Image"}
          </Button>
        </Upload>
        {imageUrl && (
          <div className="mt-2 text-green-500 text-sm">Image uploaded successfully</div>
        )}
      </div> */}

      <div className="mt-6 text-center">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AddMedicine;
