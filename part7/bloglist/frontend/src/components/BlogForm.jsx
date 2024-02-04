import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

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
                    <input
                        onChange={handleTitleChange}
                        value={title}
                        required={true}
                        placeholder="title"
                        type="text"
                    />
                </div>
                <div>
                    author:{' '}
                    <input
                        onChange={handleAuthorChange}
                        value={author}
                        required={true}
                        placeholder="author"
                        type="text"
                    />
                </div>
                <div>
                    url:{' '}
                    <input
                        onChange={handleUrlChange}
                        value={url}
                        required={true}
                        placeholder="url"
                        type="text"
                    />
                </div>
            </div>
            <div>
                <button type="submit">create</button>
            </div>
        </form>
    )
}

export default BlogForm
