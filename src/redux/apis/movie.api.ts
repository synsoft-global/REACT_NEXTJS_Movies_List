import { MovieDTO } from '@/dtos/Movie.dto'
import { api } from './api.config'



export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    movieList: builder.query<{ movies: MovieDTO[], totalMovies: number, totalPages: number }, { page: number, pageSize: number }>({
      query: (data) => ({
        url: '/movieList',
        params: data
      })
    }),

    addMovie: builder.mutation<{ movie: MovieDTO }, { title: string, image: File, publishingYear: number }>({
      query: (data) => ({
        url: '/addMovie',
        method: 'POST',
        formData: true,
        body: data,
        headers: { hideToast: 'true' },
      })
    }),

    updateMovie: builder.mutation<{ movie: MovieDTO }, { id: string, title: string, image: File | string, publishingYear: number }>({
      query: (data) => ({
        url: '/updateMovie',
        method: 'POST',
        formData: true,
        body: data,
        headers: { hideToast: 'true' },
      })
    }),

    getMovie: builder.query<{ movie: MovieDTO }, string>({
      query: (id) => `/getMovie/${id}`,
    }),

  })
})


export const {
  useLazyMovieListQuery,
  useAddMovieMutation,
  useLazyGetMovieQuery,
  useUpdateMovieMutation,
} = extendedApi