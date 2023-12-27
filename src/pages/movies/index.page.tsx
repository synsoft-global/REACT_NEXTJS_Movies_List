import { useEffect } from 'react'
import { Alert, Button, CircularProgress, Container, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { useLazyMovieListQuery } from '@/redux/apis/movie.api'
import { MdAddCircleOutline } from 'react-icons/md'
import { Page } from '@/types/Page.type'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { style } from './Movies.style'
import PageHeader from '@/components/pageHeader/PageHeader.component'
import MovieCard from '@/components/movieCard/MovieCard.component'
import Pagination from '@/components/pagination/Pagination.component'
import Link from 'next/link'



const Movies: Page = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const page = Number(router.query.page || 1)
  const [getMovieList, { isLoading, isUninitialized, data, isError, isFetching }] = useLazyMovieListQuery()


  useEffect(() => {
    getMovieList({ page, pageSize: 8 })
  }, [page])


  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    router.push({ query: { page } }, undefined, { shallow: true })
  }


  const NoRecord = () => <>
    <Stack sx={style.noRecord}>
      <Typography variant='h2'>{t('pages.moviesList.noRecord')}</Typography>
      <Button variant='contained' href='/movies/add' sx={style.addNewButton} component={Link}>{t('pages.moviesList.addMovie')}</Button>
    </Stack>
  </>


  return (
    <Container sx={style.container}>

      {/* === Page Header === */}
      <PageHeader
        heading='pages.moviesList.heading'
        ActionButtons={
          <Tooltip title={t('pages.moviesList.addMovie')}>
            <IconButton size='large' href='/movies/add' component={Link}>
              <MdAddCircleOutline />
            </IconButton>
          </Tooltip>
        }
      />


      {/* === Content === */}
      {(isLoading || isUninitialized) ?
        <Stack component={CircularProgress} mx='auto' />
        : isError ?
          <Alert severity='error'>{t('errorMessage.somethingWentWrong')}</Alert>
          :
          data?.totalMovies === 0 ?
            <NoRecord />
            : <>
              {isFetching ?
                <Stack component={CircularProgress} mx='auto' />
                :
                <Grid container columnSpacing={{ xs: 2.5, sm: 3 }} rowSpacing={{ xs: 5, sm: 3 }}>
                  {data?.movies.map((item, index) =>
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <MovieCard data={item} link={`/movies/edit/${item.id}`} />
                    </Grid>
                  )}
                </Grid>
              }

              <Stack className='mt-lg' alignItems='center'>
                <Pagination count={data?.totalPages} defaultPage={page} onChange={handlePageChange} />
              </Stack>
            </>
      }

    </Container>
  )
}


Movies.layoutProps = {
  pageType: 'protected',
  title: 'pages.moviesList.pageTitle'
}


export default Movies