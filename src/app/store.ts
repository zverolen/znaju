import { configureStore } from '@reduxjs/toolkit' 

import phrasesReducer from '../features/phrases/phrasesSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    phrases: phrasesReducer,
    user: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store