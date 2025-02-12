import { configureStore } from '@reduxjs/toolkit'
import tvReducer from './reducers/tvSlice'
import movieReducer from './reducers/movieSlice'
import peopleReducer from './reducers/peopleSlice'

export const store = configureStore({
  reducer: {
    movie:movieReducer,
    tv:tvReducer,
    people:peopleReducer
  },
}) 