import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Router from 'next/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
nProgress.configure({ showSpinner: false })



export default function useNProgress() {
  const router = useRouter()
  const ignoreRoutes = ['/auth/sign-in']


  useEffect(() => {
    const handleStart = () => { nProgress.start() }
    const handleComplete = () => { nProgress.done() }

    Router.ready(() => {
      router.events.on('routeChangeStart', (path, options) => {
        if (!options.shallow && !ignoreRoutes.includes(path)) handleStart()
      })
      router.events.on('routeChangeComplete', handleComplete)
      router.events.on('routeChangeError', handleComplete)
    })

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router.events])


  return null
}