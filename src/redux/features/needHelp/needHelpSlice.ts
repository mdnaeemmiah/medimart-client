import { baseApi } from "../../api/baseApi";

const needHelpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new help request
    createHelpRequest: builder.mutation({
      query: (helpRequestData) => ({
        url: "/help/create", // POST /
        method: "POST",
        body: helpRequestData,
      }),
      invalidatesTags: ["HelpRequest"],
    }),

    // Get all help requests
    getHelpRequests: builder.query({
      query: () => ({
        url: "/help", // GET /
        method: "GET",
      }),
      providesTags: ["HelpRequest"],
    }),

    // Get a single help request by ID
    getSingleHelpRequest: builder.query({
      query: (id: string) => ({
        url: `/help/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "HelpRequest", id }],
    }),

    // Update a help request (PATCH)
    updateHelpRequest: builder.mutation({
      query: ({ id, body }) => ({
        url: `/help/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["HelpRequest"],
    }),

    // Delete a help request
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
  useGetHelpRequestsQuery,
  useGetSingleHelpRequestQuery,
  useUpdateHelpRequestMutation,
  useDeleteHelpRequestMutation,
} = needHelpApi;
