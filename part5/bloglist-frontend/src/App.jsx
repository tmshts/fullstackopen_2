import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ) 
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      //console.log('logging in with', username, password)
      //console.log(user)
      // user details and token are saved on the local storage
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      // token of the user is saved in blogService
      blogService.setToken(user.token)
      // user details and token are saved to the application's state
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    //console.log('logging out')
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    const addedBlog = await blogService.create(blogObject)

    setBlogs(blogs.concat(addedBlog))

    setNotification(
      `A new blog ${addedBlog.title} by ${addedBlog.author} added`
    )
    setTimeout(() => {
      setNotification(null)
    }, 5000) 

    setAuthor('')
    setTitle('')
    setUrl('')

  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notification} />
      <ErrorMessage message={errorMessage} />

      {!user && loginForm()}
      {user && <div>
       <p>{user.name} logged in<button onClick={handleLogOut}>logout</button></p>
       </div>
      }

      {user &&
        <div>
        <h2>create new</h2> 
          <BlogForm onSubmit={addBlog}
          title={title} author={author} url={url}
          handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange}
          />
        </div>
      }

      {user && <div>
      {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
      )}
      </div>
      }

    </div>
  )
}

export default App