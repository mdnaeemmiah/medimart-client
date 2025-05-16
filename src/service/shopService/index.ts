/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

const baseUrl = `${process.env.SERVER_URL}/api/addMedicine`;

export const getMedicines = async () => {
  try {
    const res = await fetch(baseUrl, { method: "GET" });
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return { ok: false, error: "Network error" };
  }
};

export const getSingleMedicine = async (medicineId: string) => {
  try {
    const res = await fetch(`${baseUrl}/${medicineId}`, { method: "GET" });
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return { ok: false, error: "Network error" };
  }
};

export const createMedicine = async (data: any) => {
  try {
    const res = await fetch(`${baseUrl}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return { ok: false, error: "Network error" };
  }
};

export const updateMedicine = async (id: string, data: any) => {
  try {
    const res = await fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return { ok: false, error: "Network error" };
  }
};

export const deleteMedicine = async (id: string) => {
  try {
    const res = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return { ok: false, error: "Network error" };
  }
};
