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
  }),
});

export const { useGetMyWalletQuery } = walletApi;
