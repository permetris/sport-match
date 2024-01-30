import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'userApiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000'
    }),
    tagTypes: [
      
    ],
    endpoints: (builder) => ({
        getManufacturerList: builder.query({
            query: (args) => ({
                url: '/manufacturer',
                params: { ...args }
            }),
            providesTags: ['manufacturerList']
        }),
    }
    )
});

export const { } = apiSlice;