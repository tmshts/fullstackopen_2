import { useState } from 'react'
import blogService from '../services/blogs'

// add state to the blog post like blogFormVisible in Togglable component
// this state controls the displayed form of the blog post like 
// url, likes and user

const Blog = ({ blog }) => {

  const [blogVisible, setBlogVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const handleViewBlog = () => {
    setBlogVisible(!blogVisible)
  }

  const handleLike = async () => {

    try {
      const blogObject = {
        user: blog.user.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: likes + 1
      }

    const updatedBlog = await blogService.updateBlog(blog.id, blogObject)
    //console.log(updatedBlog)

    setLikes(likes + 1)

    } catch(exception) {
      setErrorMessage('Blog has not been updated')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }
  

  return (
    <div style={blogStyle}>

    <div>
      {blog.title} {blog.author}
      <button onClick={handleViewBlog}>{blogVisible ? 'hide' : 'view'}</button>
    </div>

    <div style={showWhenVisible}>
      <div>
        {blog.url}
      </div>
      <div>
        likes {likes} <button onClick={handleLike}>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
    </div>

    </div>

)}


export default Blog