// import { createSelector, createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { supabase } from "../../supabaseClient"

import type { User, FormEditFields } from "../../types/types"
import { RootState } from "../../app/store"

import { email, password } from '../../secret'

const initialState: User = {
  userName: 'zverolen',
  email: 'zverolendeveloper@gmail.com',
  isLoggedIn: false,
  password: 'temppassword',
  status: 'idle'
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true
    },
    logOut: (state) => {
      state.isLoggedIn = false
    },
    edit: (state, action: PayloadAction<FormEditFields>) => {
      
      const {userName, email, password} = action.payload
      if (userName && userName !== state.userName) {
        state.userName = userName
      }
      if (email && email !== state.email) {
        state.email = email
      }
      if (password && password !== state.password) {
        state.password = password
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(tempSignUp.fulfilled, (state) => {
        state.status = 'success'
      })
  }
})

export const { logIn, logOut, edit } = userSlice.actions

export const selectUserName = (state: RootState) => state.user.userName
export const selectEmail = (state: RootState) => state.user.email
export const selectUserStatus  = (state: RootState) => state.user.isLoggedIn
export const selectPassword  = (state: RootState) => state.user.password

export const tempSignUp = createAsyncThunk(
  'user/tempSignUp',
  async () => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    
    if (error) {
      console.log(error)
    }
    return data
  })

export default userSlice.reducer