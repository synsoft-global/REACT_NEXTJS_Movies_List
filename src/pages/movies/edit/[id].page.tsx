import { useEffect } from 'react'
import { Page } from '@/types/Page.type'
import { Alert, CircularProgress, Container, Stack } from '@mui/material'
import { useLazyGetMovieQuery } from '@/redux/apis/movie.api'
import { useRouter } from 'next/router'
import PageHeader from '@/components/pageHeader/PageHeader.component'
import MovieForm from '../components/movieForm/MovieForm.component'
import { useTranslation } from 'react-i18next'



const EditMovie: Page = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [getMovie, { isLoading, isUninitialized, isFetching, isError, data }] = useLazyGetMovieQuery()


  useEffect(() => {
    if (router.isReady) {
      getMovie(router.query.id as string)
    }
  }, [router.isReady])


  return (
    <Container>
      <PageHeader heading={t('pages.editMovie.heading')} />
      {(isLoading || isUninitialized || isFetching) ?
        <Stack component={CircularProgress} mx='auto' />
        : isError ?
          <Alert severity='error'>{t('errorMessage.somethingWentWrong')}</Alert>
          :
          data && <MovieForm mode='edit' data={data.movie} />
      }
    </Container>
  )
}


EditMovie.layoutProps = {
  pageType: 'protected',
  title: 'pages.editMovie.pageTitle'
}


export default EditMovie