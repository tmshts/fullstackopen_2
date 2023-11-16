const BlogForm = (props) => {
    return (
      <form onSubmit={props.onSubmit}>
        <div>
          <div>title: <input onChange={props.handleTitleChange} value={props.title} required={true} type='text' /></div>
          <div>author: <input onChange={props.handleAuthorChange} value={props.author} required={true} type='text'/></div>
          <div>url: <input onChange={props.handleUrlChange} value={props.url} required={true} type='text'/></div>
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    )
  }

export default BlogForm