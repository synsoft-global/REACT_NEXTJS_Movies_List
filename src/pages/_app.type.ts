import { NextPage } from 'next'
import type { AppProps as AppPropsType } from 'next/app'



export type AppProps = AppPropsType & {
  Component: NextPageWithLayoutProps
}


type NextPageWithLayoutProps<P = {}, IP = P> = NextPage<P, IP> & {
  layoutProps: PageLayoutProps
}


export type PageLayoutProps = {
  header?: boolean
  footer?: boolean
  title: string | false | null
  pageType: 'auth' | 'protected' | 'public'
}