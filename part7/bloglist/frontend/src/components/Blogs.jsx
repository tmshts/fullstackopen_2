import BlogForm from './BlogForm'
import Notification from './Notification'
import ErrorMessage from './ErrorMessage'
import Togglable from './Togglable'

import { useRef } from 'react'

import { Link } from 'react-router-dom'

const Blogs = ({blogs}) => {

    const blogFormRef = useRef()

    const addBlog = async () => {
        blogFormRef.current.toggleVisibility()
    }

    const blogForm = () => {
        return (
            <div>
                <Togglable buttonLabel="create new" ref={blogFormRef}>
                    <BlogForm
                        createBlogForm={addBlog}
                    />
                </Togglable>
            </div>
        )
    }

    if(blogs.length === 0) {
        return (
            <div>
                <h2>Blog app</h2>

                {blogForm()}

                <h4>No blogs added yet.</h4>
            </div>
        )
    }


    return (
        <div>
            <h2>Blog app</h2>

            <Notification />
            <ErrorMessage />

            {blogForm()}

            {blogs.map(blog =>
            <div key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                    {blog.title}
                </Link>
            </div>
            )}
      </div>
    )
}

export default Blogs