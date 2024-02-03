import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import errorMessageReducer from './reducers/errorMessageReducer'

const store = configureStore({
    reducer: {
      blogs: blogsReducer,
      notification: notificationReducer,
      errorMessage: errorMessageReducer
    }
  })

//console.log(store.getState())

export default store