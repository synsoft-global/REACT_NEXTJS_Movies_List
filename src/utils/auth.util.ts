import { removeCookie } from '@/utils'



export const handleLogout = () => {
  window.location.href = '/auth/sign-in'
  removeCookie('token')
}