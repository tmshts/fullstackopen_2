import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { increaseVotes, deleteBlogDispatch, createComment } from '../reducers/blogsReducer'

import { useParams } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'

const Blog = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signUser = useSelector(({ blogs, users, signUser, notification, errorMessage }) => {
        return signUser
    })

    const blogs = useSelector(({ blogs, users, signUser, notification, errorMessage }) => {
        return blogs
    })

    const id = useParams().id
    const blog = blogs.find(blog => blog.id === id)

    const [comment, setComment] = useState('')

    if (!blog) { 
        return null
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
        
        dispatch(increaseVotes(blogToUpdate))
    } 

    const handleDelete = async (blog) => {
        if (
            window.confirm(
                `Do you want to remove blog ${blog.title} by ${blog.author}`
            )
        ) {
            dispatch(deleteBlogDispatch(blog))
            navigate('/')
        }
    }

    const addComment = async (event) => {
        event.preventDefault()
        setComment('')
        const blog_id = blog.id
        dispatch(createComment({ comment, blog_id }))
    }

    const handleComment = (event) => {
        setComment(event.target.value)
    }

    
    return (
        <div>
            <h2>Blog app</h2>

            <h1>{blog.title}</h1>
                    
            <p>{blog.url}</p>
            <p>{blog.likes}{' '}likes{' '}
                <button className="like_btn" onClick={() => handleLike(blog)}>
                    like
                </button>
            </p>
            <div>
                added by {blog.user.name}
            </div>
            <div>
                {signUser.username === blog.user.username && (
                    <button className="delete_btn" onClick={() => handleDelete(blog)}>
                        delete
                    </button>
                )}
            </div>
            <h3>Comments:</h3>
            <form onSubmit={addComment}>
                <div>
                    <input
                        onChange={handleComment}
                        value={comment}
                        required={true}
                        type="text"
                    /><button type="submit">add comment</button>
                </div>
                
            </form>
    
            {blog.comments.map((comment) => (
                        <div key={comment.id}>
                            <ul>
                                <li>{comment.content}</li>
                            </ul>
                        </div>
                    ))}
        </div>
    )
}

export default Blog