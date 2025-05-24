import { baseApi } from "../../api/baseApi";

const medicineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new medicine
    createMedicine: builder.mutation({
      query: (medicineData) => ({
        url: "/addMedicine", // POST /
        method: "POST",
        body: medicineData,
      }),
      invalidatesTags: ["Medicine"],
    }),

    // Get all medicines
    getMedicines: builder.query({
      query: () => ({
        url: "/addMedicine", // GET /
        method: "GET",
      }),
      providesTags: ["Medicine"],
    }),

    // Get a single medicine by ID
    getSingleMedicine: builder.query({
      query: (medicineId: string) => ({
        url: `/addMedicine/${medicineId}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Medicine", id }],
    }),

    // Update a medicine (PATCH)
    updateMedicine: builder.mutation({
  query: ({ id, body }) => ({
    url: `/addMedicine/${id}`,
    method: "PUT",
    body,
  }),
      invalidatesTags: ["Medicine"],
    }),

    // Delete a medicine
    deleteMedicine: builder.mutation({
      query: (medicineId: string) => ({
        url: `/addMedicine/${medicineId}`,
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
