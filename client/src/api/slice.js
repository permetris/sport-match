import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (username) => ({
        url: `/user/${username}`,
      }),
    }),
    getReservations: builder.query({
      query: () => ({
        url: "/reservation",
      }),
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/login",
        body,
        method: "POST",
      }),
    }),
    updatePassword: builder.mutation({
      query: (id, request, token) => ({
        url: `/${id}/reset-password`,
        body: request,
        method: "PATCH",
        headers: {
          authorization: token,
        },
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetReservationsQuery,
  useLoginUserMutation,
  useUpdatePasswordMutation,
} = apiSlice;
