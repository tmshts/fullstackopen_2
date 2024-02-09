import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

import styled from 'styled-components'

const HandleButton = styled.button`
    color: #BF4F74;
    font-size: 1em;
    margin: 0.5em 0 0 0;
    border: 2px solid #BF4F74;
    border-radius: 10px;
`

const Input = styled.input`
    padding: grey;
    border: 2px solid black;
    border-radius: 3px;
    font-size: 15px;
    margin: 0.5em 0 0 0;
    &:focus {
        outline: none;
        box-shadow: 0px 0px 5px #BF4F74;
}`

const BlogForm = ({ createBlogForm }) => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = async (event) => {
        event.preventDefault()
        createBlogForm()

        setAuthor('')
        setTitle('')
        setUrl('')
        dispatch(createBlog({
            title: title,
            author: author,
            url: url,
        }))

    }

    return (
        <form onSubmit={addBlog}>
            <div>
                <div>
                    title:{' '}
                    <Input
                        onChange={handleTitleChange}
                        value={title}
                        required={true}
                        placeholder="title"
                        type="text"
                    />
                </div>
                <div>
                    author:{' '}
                    <Input
                        onChange={handleAuthorChange}
                        value={author}
                        required={true}
                        placeholder="author"
                        type="text"
                    />
                </div>
                <div>
                    url:{' '}
                    <Input
                        onChange={handleUrlChange}
                        value={url}
                        required={true}
                        placeholder="url"
                        type="text"
                    />
                </div>
            </div>
            <div>
                <HandleButton type="submit">create</HandleButton>
            </div>
        </form>
    )
}

export default BlogForm
