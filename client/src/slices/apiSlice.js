import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

function toQueryString(obj) {
  if (!obj) return "";
  return Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
}

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    sendEmailForPassword: builder.mutation({
      query: (body) => ({
        url: `/forgotten-password`,
        method: 'POST',
        body
      }),
    }),
    resetPasswordWithToken: builder.mutation({
      query: (body) => ({
        url: `/reset-password`,
        method: 'PATCH',
        body
      }),
    }),
    getUser: builder.query({
      query: (username) => ({
        url: `/user/${username}`,
      }),
    }),
    getUserHistory: builder.query({
      query: (id) => ({
        url: `/user/${id}/history`,
      }),
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `/user/${user._id}`,
        body:user,
        method: "PUT"
      }),
    }),
    deleteUser: builder.mutation({
      query: (user) => ({
        url: `/user/${user._id}`,
        body:user,
        method: "DELETE"
      }),
    }),
    getReservations: builder.query({
      query: (query) => ({
        url: `/reservation?${toQueryString(query)}`,
      }),
    }),
    deleteReservation: builder.mutation({
      query: (reservationId) => ({
        url: `/reservation/${reservationId}`,
        method: "DELETE"
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
    addReservation: builder.mutation({
      query: (body) => ({
        url: `/reservation`,
        body,
        method: "POST",
      }),
    }),
    getCities: builder.query({
      query: (query) => ({
        url: `/city?page=${query?.page}`,
        method: "GET",

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
  
    createUser: builder.mutation({
      query: (body) => ({
        url: `/user`,
        body,
        method: "POST",
      }),
    }),
    getUsers: builder.query({
      query: (query) => ({
        url: `/user?${toQueryString(query)}`,
        method: "GET"
      }),
    }),
    getFields: builder.query({
      query: (query) => ({
        url: `/field?${toQueryString(query)}`,
        method: "GET",
      }),
    }),
    updateField: builder.mutation({
      query: (body) => ({
        url: `/field/${body._id}`,
        body,
        method: "PUT",
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

      }),
    }),
    deleteField: builder.mutation({
      query: ({ id }) => ({
        url: `/field/${id}`,
        method: "DELETE",

      }),
    }),
    
    addCity: builder.mutation({
      query: (body) => ({
        url: `/city`,
        body,
        method: "POST",
      }),
    }),
    updateCity: builder.mutation({
      query: (body) => ({
        url: `/city/${body._id}`,
        body,
        method: "PUT",
      }),
    }),
    addField: builder.mutation({
      query: (body) => ({
        url: `/field`,
        body,
        method: "POST",

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
  useAddCityMutation,
  useDeleteFieldMutation,
  useAddFieldMutation,
  useAddReservationMutation,
  useUpdateUserMutation,
  useDeleteReservationMutation,
  useUpdateCityMutation,
  useGetUserHistoryQuery,
  useLazyGetUserHistoryQuery,
  useUpdateFieldMutation,
  useSendEmailForPasswordMutation,
useResetPasswordWithTokenMutation
} = apiSlice;
