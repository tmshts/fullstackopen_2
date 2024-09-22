import { createSlice, current } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import userService from '../services/users'

import { deleteBlogInUser, appendBlogInUser } from './usersReducer'

import { setNotification } from './notificationReducer'
import { setErrorMessage } from './errorMessageReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    // action creators
    addVote(state, action) {
      const updatedBlog = action.payload
      return state.map(blog =>
        blog.id !== updatedBlog.id ? blog : updatedBlog 
      )
    },
    updateBlogsAfterComment(state, action) {
      const comment = action.payload

      const blog_id = comment.blog
      const blog = [ ...current(state).filter(blog => blog.id === blog_id)]
      const the_blog = blog[0]

      const updated_comment = {
        content: comment.content,
        id: comment.id
      }
      
      const updated_comments = the_blog.comments.concat(updated_comment)

      const updated_blog = {
        ...the_blog,
        comments: updated_comments,
      }

      return [ ...state.map(blog => {
        return (
          blog.id !== updated_blog.id ? blog : updated_blog 
        )
        })]
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

export const { addVote, appendBlog, setBlogs, blogToDelete, updateBlogsAfterComment } = blogSlice.actions

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
      dispatch(deleteBlogInUser(blog))
      dispatch(setNotification(`Blog "${blog.title}" has been deleted`, 5))
    } catch (e) {
      dispatch(setErrorMessage(`Blog "${blog.title}" can not be deleted`, 5))
    }
  }
}

export const createComment = (content) => {
      const { comment, blog_id } = content
      return async dispatch => {
        try {
          const returnedComment = await blogService.addComment(content, blog_id)
          dispatch(updateBlogsAfterComment(returnedComment))
        } catch (exception) {
          dispatch(setErrorMessage(`Comment "${comment}" can not be added`, 5))
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
      dispatch(appendBlogInUser(newBlog))
      dispatch(setNotification(`A new blog "${content.title}" by "${content.author}" added`, 5))
    } catch (e) {
      dispatch(setErrorMessage(`Blog "${content.title}" can not be added`, 5))
    }
  }
}

export const increaseVotes = (blog) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.updateVotes(blog)
      const comments = await blogService.getAllComments(updatedBlog.id)
      const users = await userService.getAll()
      users.find(user => {
        if (user.id === updatedBlog.user) {
          dispatch(addVote({
            ...updatedBlog,
            comments: comments,
            user: {
              ...user
            }
          }))
          return user
        }
      })
    } catch (e) {
      dispatch(setErrorMessage(`A vote for blog "${blog.title}" can not be made`, 5))
    }
  }
}

export default blogSlice.reducer