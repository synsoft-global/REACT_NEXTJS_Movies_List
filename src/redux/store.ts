import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './slices/user.slice'
import { api } from './apis/api.config'
import { rtkQueryLogger } from './apis/api.util'



export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => [rtkQueryLogger, ...getDefaultMiddleware().concat(api.middleware)],
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch