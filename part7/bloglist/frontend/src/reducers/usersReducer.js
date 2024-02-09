import { createSlice, current } from '@reduxjs/toolkit'

import userService from '../services/users'

import { setErrorMessage } from './errorMessageReducer'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      const blog = action.payload

      const user = [ ...current(state).filter(user => user.id === blog.user)]
      const the_user = user[0]

      const updated_blogs_in_user = the_user.blogs.concat(blog)

      const updated_user = {
        ...the_user,
        blogs: updated_blogs_in_user,
      }

      return [ ...state.map(user => {
        return (
          user.id !== updated_user.id ? user : updated_user 
        )
      })]
    },
    deleteBlog(state, action) {
        const blog = action.payload

        const blog_id = blog.id
        const user = [ ...current(state).filter(user => user.id === blog.user.id)]
        const the_user = user[0]

        const updated_blogs_in_user = [ ...the_user.blogs.filter(blog => blog.id !== blog_id)]

        const updated_user = {
            ...the_user,
            blogs: updated_blogs_in_user,
        }

        return [ ...state.map(user => {
          return (
            user.id !== updated_user.id ? user : updated_user 
          )
        })]
      }
    }
  })


export const { setUsers, deleteBlog, appendBlog } = userSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    try {
      const users = await userService.getAll()
      dispatch(setUsers(users))
    } catch (e) {
      dispatch(setErrorMessage('Users can not be loaded', 5))
    }
  }
}

export const deleteBlogInUser = (blog) => {
  return async dispatch => {
    dispatch(deleteBlog(blog))
  }
}

export const appendBlogInUser = (newBlog) => {
  return async dispatch => {
    dispatch(appendBlog(newBlog))
  }
}



export default userSlice.reducer