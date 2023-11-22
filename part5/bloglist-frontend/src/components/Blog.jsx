import { useState } from 'react'


// add state to the blog post like blogFormVisible in Togglable component
// this state controls the displayed form of the blog post like
// url, likes and user

const Blog =  ( props ) => {

  const { blog, updateLikes, deleteBlog } = props
  const [blogObject, setBlogObject] = useState(blog)
  const [blogVisible, setBlogVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showBlogWhenVisible = { display: blogVisible ? '' : 'none' }
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  const user = JSON.parse(loggedUserJSON)

  const handleViewBlog = () => {
    setBlogVisible(!blogVisible)
  }

  const handleLike = () => {
    // blog with user
    const blogToUpdate = {
      ...blogObject,
      likes: blogObject.likes + 1
    }

    updateLikes(blogToUpdate)
    setBlogObject(blogToUpdate)
  }

  const handleDelete = async () => {
    deleteBlog(blog)
  }

  return (
    <div style={blogStyle}>

      <div>
        {blog.title} {blog.author}
        <button onClick={handleViewBlog}>{blogVisible ? 'hide' : 'view'}</button>
      </div>

      <div style={showBlogWhenVisible}>
        <div>
          {blog.url}
        </div>
        <div>
        likes {blogObject.likes} <button className='like_btn' onClick={handleLike}>like</button>
        </div>
        <div>
          {blogObject.user.name}
        </div>
        {(user.username === blog.user.username) &&
        <button className='delete_btn' onClick={handleDelete}>delete</button>
        }
      </div>

    </div>

  )
}


export default Blog