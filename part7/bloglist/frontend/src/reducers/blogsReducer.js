import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import userService from '../services/users'

import { setNotification } from './notificationReducer'
import { setErrorMessage } from './errorMessageReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const updatedBlog = action.payload
      return state.map(blog =>
        blog.id !== updatedBlog.id ? blog : updatedBlog 
      )
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    blogToDelete(state, action) {
      const blogToDelete_id = action.payload
      return state.filter(blog =>
        blog.id !== blogToDelete_id)
    }
  }
})

export const { addVote, appendBlog, setBlogs, blogToDelete } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch (e) {
      dispatch(setErrorMessage('Blogs can not be loaded', 5))
    }
  }
}

export const deleteBlogDispatch = blog => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(blog.id)
      dispatch(blogToDelete(blog.id))
      dispatch(setNotification(`Blog ${blog.title} has been deleted`, 5))
    } catch (e) {
      dispatch(setErrorMessage(`Blog ${blog.title} can not be deleted`, 5))
    }
  }
}

export const createBlog = content => {
      
  return async dispatch => {
    try {
      const newBlog = await blogService.create(content)
      const users = await userService.getAll()
      users.find(user => {
        if (user.id === newBlog.user) {
          dispatch(appendBlog({
            ...newBlog,
            user: {
              ...user
            }
          }))
          return user
        }
      })
      dispatch(setNotification(`A new blog ${content.title} by ${content.author} added`, 5))
    } catch (e) {
      dispatch(setErrorMessage(`Blog ${content.title} can not be added`, 5))
    }
  }
}

export const increaseVotes = (blog) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.updateVotes(blog)
      dispatch(addVote(updatedBlog))
      //dispatch(setNotification(`A vote for blog ${blog.title} has been increased`, 5))
    } catch (e) {
      dispatch(setErrorMessage(`A vote for blog ${blog.title} can not be made`, 5))
    }
  }
}

export default blogSlice.reducer