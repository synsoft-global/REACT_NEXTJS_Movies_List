import { useEffect, useState } from 'react'
import { LayoutProps } from './Layout.type'
import { getCookie } from '@/utils'
import { useRouter } from 'next/router'



export const useAuthentication = (props: LayoutProps) => {
  const { pageType } = props
  const router = useRouter()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const token = getCookie('token')
    if (!token && pageType === 'protected') {
      router.replace('/auth/sign-in')
    }
    else if (token && pageType === 'auth') {
      router.push('/')
    }
    else {
      setLoading(false)
    }
  }, [router.pathname])


  return { isLoading: loading }
}