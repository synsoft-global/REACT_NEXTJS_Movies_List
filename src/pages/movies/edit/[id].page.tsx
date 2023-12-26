import { Page } from '@/types/Page.type'
import { Alert, CircularProgress, Container, Stack } from '@mui/material'
import { useLazyGetMovieQuery } from '@/redux/apis/movie.api'
import { useRouter } from 'next/router'
import PageHeader from '@/components/pageHeader/PageHeader.component'
import MovieForm from '../components/movieForm/MovieForm.component'
import { useEffect } from 'react'



const EditMovie: Page = () => {
  const router = useRouter()
  const [getMovie, { isLoading, isUninitialized, isFetching, isSuccess, isError, data }] = useLazyGetMovieQuery({
    refetchOnReconnect: true
  })


  useEffect(() => {
    if (router.isReady) {
      getMovie(router.query.id as string)
    }
  }, [router.isReady])


  return (
    <Container>
      <PageHeader heading='Edit' />
      {(isLoading || isUninitialized || isFetching) ?
        <Stack component={CircularProgress} mx='auto' />
        : isError ?
          <Alert severity='error'>Sorry! Something went wrong</Alert>
          :
          data && <MovieForm mode='edit' data={data.movie} />
      }
    </Container>
  )
}


EditMovie.layoutProps = {
  pageType: 'protected',
  title: 'Edit Movie'
}


export default EditMovie