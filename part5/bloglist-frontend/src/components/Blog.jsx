import { useState } from 'react'


// add state to the blog post like blogFormVisible in Togglable component
// this state controls the displayed form of the blog post like
// url, likes and user

const Blog =  ( props ) => {

  const { blog, updateLikes, deleteBlog, loggedUser } = props
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
    <div style={blogStyle} >

      <div>
        <span className='title_and_url_div'>{blog.title} {blog.author}</span>
        <button onClick={handleViewBlog} className='view_btn'>{blogVisible ? 'hide' : 'view'}</button>
      </div>

      <div style={showBlogWhenVisible} className='url_and_likes_div'>
        <div className='url_div'>
          {blog.url}
        </div>
        <div>
        likes <span className='likes_div'>{blogObject.likes}</span>  <button className='like_btn' onClick={handleLike}>like</button>
        </div>
        <div>
          {blogObject.user.name}
        </div>
        {(loggedUser.username === blog.user.username) &&
        <button className='delete_btn' onClick={handleDelete}>delete</button>
        }
      </div>

    </div>

  )
}


export default Blog