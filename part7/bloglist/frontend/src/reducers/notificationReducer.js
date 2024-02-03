import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
      showNotification(state, action) {
        state = action.payload
        return state
      },
      removeNotification(state, action) {
        return null
      }
    }
  })
  
  export const { showNotification, removeNotification } = notificationSlice.actions

  export const setNotification = (content, time) => {
    return dispatch => {
      dispatch(showNotification(content))
      setTimeout(() => {
        dispatch(removeNotification())
      }, time * 1000)
    }
  }

  export default notificationSlice.reducer