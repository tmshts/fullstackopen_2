import { useState } from 'react'

// add state to the blog post like blogFormVisible in Togglable component
// this state controls the displayed form of the blog post like 
// url, likes and user

const Blog = ({ blog }) => {

  const [blogVisible, setBlogVisible] = useState(false)

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
        likes {blog.likes} <button>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
    </div>

    </div>

)}


export default Blog