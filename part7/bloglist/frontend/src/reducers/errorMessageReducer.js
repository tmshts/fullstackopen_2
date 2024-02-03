import { createSlice } from '@reduxjs/toolkit'

const errorMessageSlice = createSlice({
    name: 'errorMessage',
    initialState: null,
    reducers: {
      showErrorMessage(state, action) {
        state = action.payload
        return state
      },
      removeErrorMessage(state, action) {
        return null
      }
    }
  })
  
  export const { showErrorMessage, removeErrorMessage } = errorMessageSlice.actions

  export const setErrorMessage = (content, time) => {
    return dispatch => {
      dispatch(showErrorMessage(content))
      setTimeout(() => {
        dispatch(removeErrorMessage())
      }, time * 1000)
    }
  }

  export default errorMessageSlice.reducer