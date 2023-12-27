import { Container } from '@mui/material'
import PageHeader from '@/components/pageHeader/PageHeader.component'
import MovieForm from '../components/movieForm/MovieForm.component'
import { Page } from '@/types/Page.type'



const AddMovie: Page = () => {
  return (
    <Container>
      <PageHeader heading='pages.addMovie.heading' />
      <MovieForm mode='add' />
    </Container>
  )
}


AddMovie.layoutProps = {
  pageType: 'protected',
  title: 'pages.addMovie.pageTitle'
}


export default AddMovie