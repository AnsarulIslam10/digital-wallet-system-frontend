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
      query: ({ page = 1, limit = 10, type, startDate, endDate }) => {
        const params: Record<string, any> = { page, limit };
        if (type) params.type = type;
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;

        return {
          url: "/transaction/my-history",
          method: "GET",
          params,
        };
      },
      providesTags: ["Transaction"],
    }),
  }),
});

export const {
  useAddMoneyMutation,
  useWithdrawMutation,
  useSendMoneyMutation,
  useGetMyTransactionsQuery,
} = transactionApi;
