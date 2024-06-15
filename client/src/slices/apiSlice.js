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
  tagTypes: ["City", "User", "Field", "Reservation"],
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
    getReservation: builder.query({
      query: ({ id }) => ({
        url: `/reservation/${id}`,
      }),
    }),
    updateReservation: builder.mutation({
      query: (body) => ({
        url: `/reservation/${body._id}`,
        body,
        method: "PUT",
      }),
    }),
    getCities: builder.query({
      query: (query) => ({
        url: `/city?page=${query?.page}`,
        method: "GET",
        providesTags: [{type: "City", id: "LIST"}],
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
      query: ({ page,isDeleted }) => ({
        url: `/user?page=${page}&isDeleted=${isDeleted}`,
        method: "GET",
        providesTags: [{type:"User", id:"LIST"}]
      }),
    }),
    getFields: builder.query({
      query: (query) => ({
        url: `/field?page=${query?.page}&size=${query?.size}`,
        method: "GET",
      }),
    }),

    removeRegisteredPlayer: builder.mutation({
      query: ({ reservationId, playerId }) => ({
        url: `/reservation/${reservationId}/remove-player/${playerId}`,
        method: "PUT",
      }),
    }),
    deleteCity: builder.mutation({
      query: ({ id }) => ({
        url: `/city/${id}`,
        method: "DELETE",
        invalidatesTags: [{type: "City", id: "LIST"}],
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: "DELETE",
        invalidatesTags: [{type: "User", id: "LIST"}],
      }),
    }),
    addCity: builder.mutation({
      query: (body) => ({
        url: `/city`,
        body,
        method: "POST",
        invalidatesTags: [{type: "City", id: "LIST"}],
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
  useLazyGetFieldsQuery,
  useRemoveRegisteredPlayerMutation,
  useLazyGetReservationQuery,
  useUpdateReservationMutation,
  useDeleteCityMutation,
  useDeleteUserMutation,
  useAddCityMutation
} = apiSlice;
