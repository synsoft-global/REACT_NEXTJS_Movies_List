import { Box } from '@mui/material'
import { LayoutProps } from './Layout.type'
import { useAuthentication } from './Layout.hook'
import Head from 'next/head'
import Header from './components/header/Header.component'
import Footer from './components/footer/Footer.component'
import WebsiteLoader from '@/components/websiteLoader/WebsiteLoader.component'



export default function Layout(props: LayoutProps) {
  const { header, footer, children, title } = props
  const { isLoading } = useAuthentication(props)


  return <>
    <Head>
      {title && <title>{`${title} | MovieList`}</title>}
    </Head>

    {isLoading ?
      <WebsiteLoader />
      :
      <>
        {header !== false && <Header />}
        <Box component='main' flex={1}>
          {children}
        </Box>
        {footer !== false && <Footer />}
      </>
    }

  </>
}