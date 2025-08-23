/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get my profile
    getMyProfile: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    // Update profile
    updateProfile: build.mutation({
      query: (body: Partial<{ name: string; phone: string; currentPassword?: string; newPassword?: string }>) => ({
        url: "/user/me/update",
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} = userApi;
