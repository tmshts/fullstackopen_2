import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import './index.css'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loggedUser, setLoggedUser] = useState(null)
    // const [title, setTitle] = useState('')
    // const [author, setAuthor] = useState('')
    // const [url, setUrl] = useState('')

    useEffect(() => {
        blogService.getAll().then((blogs) => {
            setBlogs(blogs)
        })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setLoggedUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    /*
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  */

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })
            //console.log('logging in with', username, password)
            //console.log(user)
            // user details and token are saved on the local storage
            window.localStorage.setItem(
                'loggedBlogAppUser',
                JSON.stringify(user)
            )
            // token of the user is saved in blogService
            blogService.setToken(user.token)
            // user details and token are saved to the application's state
            setLoggedUser(user)
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
        setLoggedUser(null)
    }

    const blogFormRef = useRef()

    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()

        try {
            const addedBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(addedBlog))
            setNotification(
                `A new blog ${addedBlog.title} by ${addedBlog.author} added`
            )
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        } catch (exception) {
            setErrorMessage(`Blog ${blogObject.title} can not be added.`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const deleteBlog = async (blogObject) => {
        try {
            if (
                window.confirm(
                    `Do you want to remove blog ${blogObject.title} by ${blogObject.author}`
                )
            ) {
                await blogService.deleteBlog(blogObject.id)
                setNotification(
                    `A blog ${blogObject.title} by ${blogObject.author} has been deleted`
                )
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
                setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
            }
        } catch (exception) {
            setErrorMessage(`Blog ${blogObject.title} can not be added.`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const updateLikes = async (blogToUpdate) => {
        try {
            const updatedBlog = await blogService.updateBlog(
                blogToUpdate.id,
                blogToUpdate
            )
            //console.log(blogs.map(blog => blog.id === blogToUpdate.id ? blogToUpdate : blog ))
            setBlogs(
                blogs.map((blog) =>
                    blog.id === blogToUpdate.id ? blogToUpdate : blog
                )
            )
        } catch (exception) {
            setErrorMessage(`A like for ${blogToUpdate.title} cannot be made.`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const blogForm = () => {
        return (
            <div>
                <Togglable buttonLabel="new note" ref={blogFormRef}>
                    <BlogForm
                        // title={title} author={author} url={url}
                        // handleTitleChange={handleTitleChange}
                        // handleAuthorChange={handleAuthorChange}
                        // handleUrlChange={handleUrlChange}
                        createBlog={addBlog}
                    />
                </Togglable>
            </div>
        )
    }

    if (loggedUser === null) {
        return (
            <div>
                <h2>Log in to application</h2>

                <ErrorMessage message={errorMessage} />

                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) =>
                        setUsername(target.value)
                    }
                    handlePasswordChange={({ target }) =>
                        setPassword(target.value)
                    }
                    handleSubmit={handleLogin}
                />
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>

            <Notification message={notification} />

            <div>
                <p>
                    {loggedUser.name} logged in
                    <button className="log_out" onClick={handleLogOut}>
                        logout
                    </button>
                </p>
            </div>

            {blogForm()}

            <div>
                {blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            updateLikes={updateLikes}
                            deleteBlog={deleteBlog}
                            loggedUser={loggedUser}
                        />
                    ))}
            </div>
        </div>
    )
}

export default App
