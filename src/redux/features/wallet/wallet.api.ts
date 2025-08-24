import { baseApi } from "@/redux/baseApi";


export const walletApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyWallet: build.query({
      query: () => ({
        url: "/wallet/my-wallet",
        method: "GET",
      }),
      providesTags: ["Wallet"],
    }),
    getAllWallet: build.query({
      query: () => ({
        url: "/wallet/all-wallets",
        method: "GET",
      }),
      providesTags: ["Wallet"],
    }),
  }),
});

export const { useGetMyWalletQuery, useGetAllWalletQuery } = walletApi;
