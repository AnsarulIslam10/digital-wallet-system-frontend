/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";


export const transactionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addMoney: build.mutation({
            query: (body) => ({
                url: "/transaction/add",
                method: "POST",
                data: body,
            }),
            invalidatesTags: ["Wallet", "Transaction"],
        }),

        // agent cash in
        cashIn: build.mutation({
            query: (body: { amount: number }) => ({
                url: "/transaction/cash-in",
                method: "POST",
                data: body,
            }),
            invalidatesTags: ["Wallet", "Transaction"],
        }),
        // agent cash out
        cashOut: build.mutation<
            any,
            { userPhone: string; amount: number; password: string }
        >({
            query: (body) => ({
                url: "/transaction/cash-out",
                method: "POST",
                data: body,
            }),
            invalidatesTags: ["Wallet", "Transaction"],
        }),

        // Withdraw
        withdraw: build.mutation({
            query: (body) => ({
                url: "/transaction/withdraw",
                method: "POST",
                data: body,
            }),
            invalidatesTags: ["Wallet", "Transaction"],
        }),

        // Send Money
        sendMoney: build.mutation({
            query: (body) => ({
                url: "/transaction/send",
                method: "POST",
                data: body,
            }),
            invalidatesTags: ["Wallet", "Transaction"],
        }),

        // My Transaction History (with pagination)
        getMyTransactions: build.query({
            query: (params) => ({
                url: "/transaction/my-history",
                method: "GET",
                params,
            }),
            providesTags: ["Transaction"],
        }),

        getAgentTransactions: build.query({
            query: (params) => ({
                url: "/transaction/agent-transactions",
                method: "GET",
                params,
            }),
            providesTags: ["Transaction"],
        }),

    }),
});

export const {
    useAddMoneyMutation,
    useCashInMutation,
    useCashOutMutation,
    useWithdrawMutation,
    useSendMoneyMutation,
    useGetMyTransactionsQuery,
    useGetAgentTransactionsQuery
} = transactionApi;
