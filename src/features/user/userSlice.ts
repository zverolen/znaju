// import { createSelector, createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { supabase } from "../../supabaseClient"

import type { User } from "../../types/types"
import { RootState } from "../../app/store"

interface EditActionPayload {
  userName?: string;
  email?: string;
}


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
    },
    // edit: (state, action: PayloadAction<EditActionPayload>) => {
    //   // Needs a better approach. Intent: to set both fields after the dispatch button is pressed. Maybe two separate 
    //   // reducers for one event handler.
    //   const newUserName = action.payload.userName || state.userName
    //   const newEmail = action.payload.email || state.email
    //   state = {...state, userName: newUserName, email: newEmail}

    //!!!! three reducers - email, username and status (logged in), actually, only two status values are needed, logged in true/false, edit
    // is a local thing.
    // }
  }
})

export const { logIn } = userSlice.actions

export const selectUserName = (state: RootState) => state.user.userName
export const selectEmail = (state: RootState) => state.user.email
export const selectUserStatus  = (state: RootState) => state.user.userStatus

export default userSlice.reducer