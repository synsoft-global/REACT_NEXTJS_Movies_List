import { AppProps } from './_app.type'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@/utils'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { Toaster } from 'react-hot-toast'
import Head from 'next/head'
import Layout from '@/layout/Layout.component'
import '@/styles/global.css'
import '@/lib/yup/config'
import '@/locales/i18n'



export default function App(props: AppProps) {
  const { Component, pageProps } = props
  const layoutProps = Component.layoutProps


  return <>
    <Head>
      <title>MovieList - Unlimited movies, TV shows and beyond</title>
    </Head>

    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Toaster position='bottom-left' />
        <Layout {...layoutProps}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  </>
}
