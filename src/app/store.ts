import { configureStore } from '@reduxjs/toolkit'

import phrasesReducer from '../features/phrases/phrasesSlice'
import profileReducer from '../features/profile/profileSlice'

export const store = configureStore({
  reducer: {
    phrases: phrasesReducer,
    profile: profileReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store