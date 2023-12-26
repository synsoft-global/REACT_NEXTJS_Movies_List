import { createSlice } from '@reduxjs/toolkit'



export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false
  },
  reducers: {

    updateProfile: (state, action) => {
      state.isLoggedIn = true
    },

  }
})


export const { updateProfile } = userSlice.actions