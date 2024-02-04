import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import errorMessageReducer from './reducers/errorMessageReducer'
import signUsersReducer from './reducers/signUsersReducer'

const store = configureStore({
    reducer: {
      blogs: blogsReducer,
      signUser: signUsersReducer,
      notification: notificationReducer,
      errorMessage: errorMessageReducer
    }
  })

//console.log(store.getState())

export default store