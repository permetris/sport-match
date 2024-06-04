import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    console.log();
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["cities"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (username) => ({
        url: `/user/${username}`,
      }),
    }),
    getReservations: builder.query({
      query: ({ city, date, page }) => ({
        url: `/reservation?city=${city}&date=${date}&page=${page}`,
      }),
    }),
    getCities: builder.query({
      query: (query) => ({
        url: `/city?page=${query?.page}`,
        method: "GET",
        providesTag: "cities",
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
      query: ({ id, body }) => {
        return { url: `/${id}/reset-password`, body, method: "PATCH" };
      },
    }),
    getUserHistory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/user/${id}/history`,
        body,
        method: "POST",
      }),
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: `/user`,
        body,
        method: "POST",
      }),
    }),
    getUsers: builder.query({
      query: ({page}) => ({
        url: `/user?page=${page}`,
        method: "GET",
      }),
    }),
    getFields: builder.query({
      query: (query) => ({
        url: `/field?page=${query?.page}&size=${query?.size}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetReservationsQuery,
  useLoginUserMutation,
  useUpdatePasswordMutation,
  useLazyGetReservationsQuery,
  useGetCitiesQuery,
  useLazyGetCitiesQuery,
  useCreateUserMutation,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetFieldsQuery,
  useLazyGetUserQuery,
  useLazyGetFieldsQuery
} = apiSlice;
