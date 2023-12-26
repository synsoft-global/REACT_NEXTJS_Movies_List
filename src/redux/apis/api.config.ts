import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from '@/utils'
import config from '@/config/config.json'



export const api = createApi({
  reducerPath: 'apis',
  tagTypes: ['movie'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiBaseUrl,
    prepareHeaders: (headers, { }) => {
      headers.set('Authorization', getCookie('token') || '')
      return headers
    }
  }),
  endpoints: (builder) => ({}),
})