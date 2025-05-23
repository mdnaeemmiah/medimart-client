import { baseApi } from "../../api/baseApi";

const medicineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new medicine
    createMedicine: builder.mutation({
      query: (medicineData) => ({
        url: "/medicine", // POST /
        method: "POST",
        body: medicineData,
      }),
      invalidatesTags: ["Medicine"],
    }),

    // Get all medicines
    getMedicines: builder.query({
      query: () => ({
        url: "/medicine", // GET /
        method: "GET",
      }),
      providesTags: ["Medicine"],
    }),

    // Get a single medicine by ID
    getSingleMedicine: builder.query({
      query: (medicineId: string) => ({
        url: `/medicine/${medicineId}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Medicine", id }],
    }),

    // Update a medicine (PATCH)
    updateMedicine: builder.mutation({
      query: ({ medicineId, updatedData }) => ({
        url: `/medicine/${medicineId}`,
        method: "PATCH", // or "PUT" if you're replacing the whole document
        body: updatedData,
      }),
      invalidatesTags: (result, error, { medicineId }) => [
        { type: "Medicine", id: medicineId },
        "Medicine",
      ],
    }),

    // Delete a medicine
    deleteMedicine: builder.mutation({
      query: (medicineId: string) => ({
        url: `/medicine/${medicineId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Medicine"],
    }),
  }),
});

export const {
  useCreateMedicineMutation,
  useGetMedicinesQuery,
  useGetSingleMedicineQuery,
  useUpdateMedicineMutation,
  useDeleteMedicineMutation,
} = medicineApi;
