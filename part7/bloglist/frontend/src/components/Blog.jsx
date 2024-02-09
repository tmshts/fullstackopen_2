import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { increaseVotes, deleteBlogDispatch, createComment } from '../reducers/blogsReducer'

import { useParams } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

const CommentButton = styled.button`
    color: #BF4F74;
    font-size: 1em;
    margin: 0.5em;
    padding: 0.25em 1em;
    border: 2px solid #BF4F74;
    border-radius: 10px;
    &:focus {
        outline: none
`

const DeleteButton = styled.button`
    background: #ADADAD;
    color: #2E1114;
    font-size: 1em;
    margin-top: 1em;
    padding: 0.25em 1em;
    border: 2px solid #BF4F74;
    border-radius: 10px;
`

const LikeButton = styled(CommentButton)`
  margin-left: 0.1em;
  font-size: 0.8em;
  padding: 0.25em 0.7em;
`

const Input = styled.input`
    padding: grey;
    border: 2px solid black;
    border-radius: 3px;
    font-size: 15px;
    &:focus {
        outline: none;
        box-shadow: 0px 0px 5px #BF4F74;
}`

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

            <h1>{blog.title}</h1>
                    
            <p><a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></p>
            <p><b>{blog.likes}</b>{' '}likes{' '}
                <LikeButton onClick={() => handleLike(blog)}>
                    like
                </LikeButton>
            </p>
            <div>
                added by {blog.user.name}
            </div>
            <div>
                {signUser.username === blog.user.username && (
                    <DeleteButton onClick={() => handleDelete(blog)}>
                        delete blog
                    </DeleteButton>
                )}
            </div>
            <h3>Comments:</h3>
            <form onSubmit={addComment}>
                    <Input
                        onChange={handleComment}
                        value={comment}
                        required={true}
                        type="text"
                    /><CommentButton type="submit">add comment</CommentButton>
                
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