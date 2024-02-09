import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { increaseVotes, deleteBlogDispatch, createComment } from '../reducers/blogsReducer'

import { useParams } from 'react-router-dom'

import {
    useNavigate
  } from 'react-router-dom'

const Blog = ({ blogs }) => {

    const dispatch = useDispatch()

    const signUser = useSelector(({ blogs, users, signUser, notification, errorMessage }) => {
        return signUser
    })

    const navigate = useNavigate()

    const id = useParams().id

    const blog = blogs.find(blog => blog.id === id)

    // after refreshing the page for a specific blog -> crush
    // the solution below is not working
    // If you know how to remove this bug, let me please know. Thank you.
    /*
    if (!blog) { 
        return null
    }

    blogs = useSelector(({ blogs, users, signUser, notification, errorMessage }) => {
        return blogs
    })
    */


    const [blogObject, setBlogObject] = useState(blog)
    const [comment, setComment] = useState('')

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
            id: blog.id,
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
            <p>{blogObject.likes}{' '}likes{' '}
                <button className="like_btn" onClick={() => handleLike(blogObject)}>
                    like
                </button>
            </p>
            <div>
                added by {blogObject.user.name}
            </div>
            <div>
                {signUser.username === blogObject.user.username && (
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