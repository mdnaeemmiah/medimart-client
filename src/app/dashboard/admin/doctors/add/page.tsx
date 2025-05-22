/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Upload,
  Space,
  DatePicker,
  TimePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateDoctorMutation } from "@/redux/features/doctor/doctorSlice";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";


const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/db9egbkam/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "naeemmiah";

const CreateDoctor = () => {
  const [form] = Form.useForm();
  const [createDoctor] = useCreateDoctorMutation();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

    return false; // prevent AntD from uploading automatically
  };

  const onFinish = async (values: any) => {
    if (!imageUrl) {
      toast.error("Please upload a doctor image");
      return;
    }

    const toastId = toast.loading("Creating doctor...");

    const doctorData = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
      time: values.time.format("h:mm A"),
      image: imageUrl,
    };

    try {
      await createDoctor(doctorData).unwrap();
      toast.success("Doctor created successfully", { id: toastId });
      form.resetFields();
      setImageUrl("");
    } catch (error) {
      toast.error("Failed to create doctor", { id: toastId });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="max-w-xl mx-auto mt-10 p-6 border rounded shadow-md bg-white"
    >
      <h2 className="text-xl font-bold mb-6">Add Doctor</h2>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter doctor's name" }]}
          >
            <Input placeholder="Doctor name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Hospital"
            name="hospital"
            rules={[{ required: true, message: "Please enter hospital" }]}
          >
            <Input placeholder="Hospital name" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please enter date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Time"
            name="time"
            rules={[{ required: true, message: "Please enter time" }]}
          >
            <TimePicker style={{ width: "100%" }} use12Hours format="h:mm A" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Day"
        name="day"
        rules={[{ required: true, message: "Please enter day" }]}
      >
        <Input placeholder="Day (e.g., Monday)" />
      </Form.Item>

      <Form.Item label="Doctor Image">
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
      style={{ borderColor: '#ddd' }}
    />
  </div>
)}
      </Form.Item>

      <Form.Item>
        <div className="text-center">
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </div>
      </Form.Item>
    </Form>
  );
};

export default CreateDoctor;
