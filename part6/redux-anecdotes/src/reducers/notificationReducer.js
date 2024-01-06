/* eslint-disable no-unused-vars */
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
  export default notificationSlice.reducer