import { createSlice } from "@reduxjs/toolkit"
export type ProfileState = []


const initialState: ProfileState = []

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {}
})

export default profileSlice.reducer