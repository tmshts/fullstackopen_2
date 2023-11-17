const BlogForm = ({ 
  title, author, url,
  handleTitleChange, handleAuthorChange, handleUrlChange,
  handleSubmit 
  }) => {

    return (
      <form onSubmit={handleSubmit}>
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