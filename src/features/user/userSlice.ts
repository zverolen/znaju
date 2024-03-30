// import { createSelector, createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
// import { supabase } from "../../supabaseClient"

import type { User } from "../../types/types"
import { RootState } from "../../app/store"


const initialState: User = {
  userName: 'zverolen',
  email: 'zverolendeveloper@gmail.com'
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
})

export const selectUserName = (state: RootState) => state.user.userName
export const selectEmail = (state: RootState) => state.user.email

export default userSlice.reducer