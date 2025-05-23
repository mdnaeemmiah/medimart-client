import { baseApi } from "../../api/baseApi";



const doctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDoctor: builder.mutation({
      query: (doctorData) => ({
        url: "/doctor/create",
        method: "POST",
        body: doctorData,
      }),
      invalidatesTags: ["Doctor"],
    }),
    getDoctors: builder.query({
      query: () => ({
        url: "/doctor",
        method: "GET",
      }),
      providesTags: ["Doctor"],
    }),
    getSingleDoctor: builder.query({
      query: (id) => ({
        url: `/doctor/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Doctor", id }],
    }),
updateDoctor: builder.mutation({
  query: ({ id, body }) => ({
    url: `/doctor/${id}`,
    method: "PATCH",
    body,
  }),
}),
    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `/doctor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctor"],
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useGetDoctorsQuery,
  useGetSingleDoctorQuery,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorApi;
