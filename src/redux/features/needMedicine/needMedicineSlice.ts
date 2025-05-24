import { baseApi } from "../../api/baseApi";

const needMedicineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new need medicine request
    createNeedMedicine: builder.mutation({
      query: (needMedicineData) => ({
        url: "/needMedicine/create",
        method: "POST",
        body: needMedicineData,
      }),
      invalidatesTags: ["NeedMedicine"],
    }),

    // Get all need medicine requests
    getAllNeedMedicines: builder.query({
      query: () => ({
        url: "/needMedicine",
        method: "GET",
      }),
      providesTags: ["NeedMedicine"],
    }),

    // Get a single need medicine request by ID
    getNeedMedicineById: builder.query({
      query: (id: string) => ({
        url: `/needMedicine/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "NeedMedicine", id }],
    }),

    // Update a need medicine request by ID
    updateNeedMedicine: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/needMedicine/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "NeedMedicine", id },
      ],
    }),

    // Delete a need medicine request by ID
    deleteNeedMedicine: builder.mutation({
      query: (id: string) => ({
        url: `/needMedicine/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NeedMedicine"],
    }),
  }),
});

export const {
  useCreateNeedMedicineMutation,
  useGetAllNeedMedicinesQuery,
  useGetNeedMedicineByIdQuery,
  useUpdateNeedMedicineMutation,
  useDeleteNeedMedicineMutation,
} = needMedicineApi;
