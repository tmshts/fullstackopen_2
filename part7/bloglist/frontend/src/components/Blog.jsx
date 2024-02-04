import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { increaseVotes, deleteBlogDispatch } from '../reducers/blogsReducer'

const Blog = (props) => {
    const dispatch = useDispatch()

    const signUser = useSelector(({ blogs, signUser, notification, errorMessage }) => {
        return signUser
    })

    const { blog } = props
    const [blogObject, setBlogObject] = useState(blog)
    const [blogVisible, setBlogVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const showBlogWhenVisible = { display: blogVisible ? '' : 'none' }

    const handleViewBlog = () => {
        setBlogVisible(!blogVisible)
    }

    const handleLike = ( blog ) => {
        const blogToUpdate = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id,
            id: blog.id
        }

        const blogToUpdateLocally = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user,
            id: blog.id
        }
        dispatch(increaseVotes(blogToUpdate))
        setBlogObject(blogToUpdateLocally)
    } 

    const handleDelete = async (blogObject) => {
        if (
            window.confirm(
                `Do you want to remove blog ${blogObject.title} by ${blogObject.author}`
            )
        ) {
            dispatch(deleteBlogDispatch(blogObject))
        }
    }
    
    return (
        <div style={blogStyle} className="blog">
            <span className="title_and_url_div">
                {blog.title} {blog.author}
            </span>
            <button onClick={handleViewBlog} className="view_btn">
                {blogVisible ? 'hide' : 'view'}
            </button>

            <div style={showBlogWhenVisible} className="url_and_likes_div">
                <div className="url_div">{blog.url}</div>
                <div className="likes_div">
                    likes{' '}
                    <span className="likes_number">{blogObject.likes}</span>{' '}
                    <button className="like_btn" onClick={() => handleLike(blogObject)}>
                        like
                    </button>
                </div>
                <div>
                    {blogObject.user.name}
                </div>
                {signUser.username === blogObject.user.username && (
                    <button className="delete_btn" onClick={() => handleDelete(blog)}>
                        delete
                    </button>
                )}
            </div>
        </div>
    )
}

export default Blog
