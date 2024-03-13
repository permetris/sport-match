import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000'
  }),
  tagTypes: [

  ],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`
      })
    }),
    getReservations: builder.query({
      query: () => ({
        url: '/reservation'
      })
    })
  })
});

export const {
  useGetUserQuery,
  useGetReservationsQuery
} = apiSlice;
