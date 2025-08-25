/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get all users
    getAllUsers: build.query({
      query: (params) => ({
        url: "/user/all-users",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),

    getAllTransactions: build.query({
      query: (params) => ({
        url: "/transaction",
        method: "GET",
        params,
      }),
      providesTags: ["Transaction"],
    }),

    // Get all wallets
    getAllWallets: build.query({
      query: () => ({
        url: "/wallet/all-wallets",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    // Block wallet
    blockWallet: build.mutation({
      query: (walletId: string) => ({
        url: `/wallet/block/${walletId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    // Unblock wallet
    unblockWallet: build.mutation({
      query: (walletId: string) => ({
        url: `/wallet/unblock/${walletId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    blockUser: build.mutation({
      query: (userId: string) => ({ 
        url: `/user/block/${userId}`, 
        method: "PATCH" 
      }),
      invalidatesTags: ["USER"],
    }),
    unblockUser: build.mutation({
      query: (userId: string) => ({ 
        url: `/user/unblock/${userId}`, 
        method: "PATCH" }),
      invalidatesTags: ["USER"],
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
  useGetAllTransactionsQuery,
  useGetAllWalletsQuery,
  useBlockWalletMutation,
  useUnblockWalletMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
} = adminApi;
