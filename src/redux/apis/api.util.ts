import { isRejectedWithValue, isFulfilled } from '@reduxjs/toolkit'
import { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { handleLogout } from '@/utils/auth.util'
import toast from 'react-hot-toast'
import i18n from '@/locales/i18n'



export const rtkQueryLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const status = action.meta.baseQueryMeta.response?.status
    const errorMessage = getErrorMessage(status, action.payload)
    if (errorMessage === 'ACCESS_DENIED') handleLogout()
    else {
      toast.error(i18n.t(`api.errorMessage.${errorMessage}`) || 'Sorry! Something went wrong')
      console.error(`😲 OMG Api Failed - Details: `, action.meta.baseQueryMeta.response)
    }
  }

  if (isFulfilled(action)) {
    const method = action.meta.baseQueryMeta.request.method
    const hideToast = action.meta.baseQueryMeta.request.headers.get('hideToast') === 'true'
    if (!hideToast && (method === 'POST' || method === 'PUT') && action.payload?.message) {
      toast.success(i18n.t(`api.successMessage.${action.payload.message}`))
    }
  }

  return next(action)
}


const getErrorMessage = (status: number, payload: any) => {
  switch (status) {
    case 0:
      return 'NO_INTERNET'
    case 429:
      return 'TOO_MANY_REQUEST'
    case 503:
      return 'SERVICE_TEMPORARILY_UNAVAILABLE'
    default:
      if (status >= 400 && status <= 499) {
        return payload?.data?.message
      } else if (status >= 500) {
        return payload?.data?.message || 'SOMETHING_WENT_WRONG'
      }
      return 'SOMETHING_WENT_WRONG'
  }
}
