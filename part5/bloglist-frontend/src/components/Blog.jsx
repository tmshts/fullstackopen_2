
// add state to the blog post like blogFormVisible in Togglable component
// this state controls the displayed form of the blog post like 
// url, likes and user

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>

      {blog.title} {blog.author}

      <div>
        {blog.url}
      </div>
      <div>
        likes {blog.likes}
      </div>
      <div>
        {blog.user.name}
      </div>

    </div>

)}


export default Blog