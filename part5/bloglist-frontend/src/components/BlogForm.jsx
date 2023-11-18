import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
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
      event.preventDefault
      // property createBlog is a function which
      // form calls when a new blog is created
      createBlog({
        title: title,
        author: author,
        url: url
      })

    setAuthor('')
    setTitle('')
    setUrl('')
    }

    return (
      <form onSubmit={addBlog}>
        <div>
          <div>title: <input onChange={handleTitleChange}
                            value={title}
                            required={true}
                            type='text' /></div>
          <div>author: <input onChange={handleAuthorChange}
                              value={author}
                              required={true}
                              type='text'/></div>
          <div>url: <input onChange={handleUrlChange}
                            value={url}
                            required={true}
                            type='text'/></div>
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    )
  }

export default BlogForm