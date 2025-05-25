import { baseApi } from "../../api/baseApi";

const needHelpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new help request
    createHelpRequest: builder.mutation({
      query: (helpRequestData) => ({
        url: "/help/create",
        method: "POST",
        body: helpRequestData,
      }),
      invalidatesTags: ["HelpRequest"],
    }),

    // Get all help requests
    getAllHelpRequests: builder.query({
      query: () => ({
        url: "/help",
        method: "GET",
      }),
      providesTags: ["HelpRequest"],
    }),

    // Get a single help request by ID
    getHelpRequestById: builder.query({
      query: (id: string) => ({
        url: `/help/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "HelpRequest", id }],
    }),

    // Update a help request by ID
    updateHelpRequest: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/help/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "HelpRequest", id }],
    }),

    // Delete a help request by ID
    deleteHelpRequest: builder.mutation({
      query: (id: string) => ({
        url: `/help/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HelpRequest"],
    }),
  }),
});

export const {
  useCreateHelpRequestMutation,
  useGetAllHelpRequestsQuery,
  useGetHelpRequestByIdQuery,
  useUpdateHelpRequestMutation,
  useDeleteHelpRequestMutation,
} = needHelpApi;
