/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button, Input, Switch, DatePicker } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useCreateMedicineMutation } from "@/redux/features/medicine/medicineSlice";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  id: Yup.string().required("Medicine ID is required"),
  name: Yup.string().required("Medicine name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  stock: Yup.number().required("Stock is required"),
  requiresPrescription: Yup.boolean(),
  manufacturerName: Yup.string().required("Manufacturer name is required"),
  manufacturerAddress: Yup.string(),
  manufacturerContact: Yup.string(),
  expiryDate: Yup.string().required("Expiry date is required"),
});

const AddMedicine = () => {
  const [createMedicine] = useCreateMedicineMutation();
//   const [imageUrl, setImageUrl] = useState("");
  const router = useRouter(); 

  const formik = useFormik({
    initialValues: {
      id: "MED005",
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
        id: values.id,
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
        expiryDate: new Date(values.expiryDate),
      };

      try {
        await createMedicine(medicineData).unwrap();
        toast.success("Medicine created successfully", { id: toastId });
        resetForm();
        // setImageUrl("");
         router.push("/dashboard/admin/medicine/all");
      } catch (error: any) {
        console.error("❌ Error creating medicine:", error);
        toast.error(error?.data?.message || "Failed to create medicine", {
          id: toastId,
        });
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="dashboard-card relative mx-auto mt-8 max-w-3xl overflow-hidden rounded-3xl p-6 md:p-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-sky-500/25 via-emerald-400/10 to-transparent" />
      <div className="mb-6 flex flex-col items-center text-center">
        <span className="rounded-full border border-sky-200/70 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700 shadow-sm dark:border-sky-400/30 dark:bg-slate-900/60 dark:text-sky-200">
          Inventory
        </span>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
          Add Medicine
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Add a new item with pricing, stock, and manufacturer details.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Medicine ID</label>
          <Input name="id" value={formik.values.id} onChange={formik.handleChange} className="dashboard-input mt-2" />
          {formik.touched.id && formik.errors.id && (
            <p className="text-red-500 text-xs">{formik.errors.id}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Name</label>
          <Input name="name" value={formik.values.name} onChange={formik.handleChange} className="dashboard-input mt-2" />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Description</label>
          <Input
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            className="dashboard-input mt-2"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-xs">{formik.errors.description}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Price ($)</label>
          <Input
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            className="dashboard-input mt-2"
          />
          {formik.touched.price && formik.errors.price && (
            <p className="text-red-500 text-xs">{formik.errors.price}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Stock</label>
          <Input
            type="number"
            name="stock"
            value={formik.values.stock}
            onChange={formik.handleChange}
            className="dashboard-input mt-2"
          />
          {formik.touched.stock && formik.errors.stock && (
            <p className="text-red-500 text-xs">{formik.errors.stock}</p>
          )}
        </div>

        <div className="md:col-span-2 flex items-center gap-3 rounded-2xl border border-sky-200/60 bg-white/70 px-4 py-3 shadow-sm dark:border-sky-400/20 dark:bg-slate-900/60">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Requires Prescription?</label>
          <Switch
            checked={formik.values.requiresPrescription}
            onChange={(checked) => formik.setFieldValue("requiresPrescription", checked)}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Manufacturer Name</label>
          <Input
            name="manufacturerName"
            value={formik.values.manufacturerName}
            onChange={formik.handleChange}
            className="dashboard-input mt-2"
          />
          {formik.touched.manufacturerName && formik.errors.manufacturerName && (
            <p className="text-red-500 text-xs">{formik.errors.manufacturerName}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Manufacturer Address</label>
          <Input
            name="manufacturerAddress"
            value={formik.values.manufacturerAddress}
            onChange={formik.handleChange}
            className="dashboard-input mt-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Manufacturer Contact</label>
          <Input
            name="manufacturerContact"
            value={formik.values.manufacturerContact}
            onChange={formik.handleChange}
            className="dashboard-input mt-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Expiry Date</label>
          <DatePicker
            className="dashboard-input mt-2 w-full"
            onChange={(date, dateString) => formik.setFieldValue("expiryDate", dateString)}
            value={formik.values.expiryDate ? dayjs(formik.values.expiryDate) : null}
          />
          {formik.touched.expiryDate && formik.errors.expiryDate && (
            <p className="text-red-500 text-xs">{formik.errors.expiryDate}</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 text-center">
        <Button type="primary" htmlType="submit" className="h-10 px-8 shadow-lg shadow-sky-500/20">
          Submit
        </Button>
        <p className="text-xs text-slate-500 dark:text-slate-400">This will appear in inventory after approval.</p>
      </div>
    </form>
  );
};

export default AddMedicine;
