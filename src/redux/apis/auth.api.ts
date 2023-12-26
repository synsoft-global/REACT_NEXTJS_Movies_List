import { api } from './api.config'



export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation<{ message: string, token: string }, { email: string, password: string }>({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data
      })
    }),

  })
})


export const {
  useLoginMutation
} = extendedApi