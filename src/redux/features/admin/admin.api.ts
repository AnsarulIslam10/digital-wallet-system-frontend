/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get all users
    getAllUsers: build.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    // Approve agent
    approveAgent: build.mutation({
      query: (agentId: string) => ({
        url: `/user/agent/approve/${agentId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    // Suspend agent
    suspendAgent: build.mutation({
      query: (agentId: string) => ({
        url: `/user/agent/suspend/${agentId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useApproveAgentMutation,
  useSuspendAgentMutation,
} = adminApi;
