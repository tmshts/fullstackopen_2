import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'

import { setErrorMessage } from './errorMessageReducer'

import blogService from '../services/blogs'

const signUserSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setSignUser(state, action) {
      return action.payload
    }
  }
})

export const { setSignUser } = signUserSlice.actions

export const storeSignInUserEffect = (user) => {
  return async dispatch => {
      dispatch(setSignUser(user))
      blogService.setToken(user.token)
  }
}


export const removeSignInUser = () => {
  return async dispatch => {
      dispatch(setSignUser(null))
  }
}


export const storeSignInUser = (credentials) => {
  return async dispatch => {
    try {
      const signInUser = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(signInUser)
      )

      blogService.setToken(signInUser.token)

      dispatch(setSignUser(signInUser))

    } catch (e) {
      dispatch(setErrorMessage('Wrong username or password', 5))
    }
  }
}

export default signUserSlice.reducer