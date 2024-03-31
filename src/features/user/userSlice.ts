// import { createSelector, createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { supabase } from "../../supabaseClient"

import type { User } from "../../types/types"
import { RootState } from "../../app/store"


const initialState: User = {
  userName: 'zverolen',
  email: 'zverolendeveloper@gmail.com',
  userStatus: 'loggedOut',
  password: 'temppassword'
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state) => {
      state.userStatus = 'loggedIn'
    }
  }
})

export const { logIn } = userSlice.actions

export const selectUserName = (state: RootState) => state.user.userName
export const selectEmail = (state: RootState) => state.user.email
export const selectUserStatus  = (state: RootState) => state.user.userStatus

export default userSlice.reducer