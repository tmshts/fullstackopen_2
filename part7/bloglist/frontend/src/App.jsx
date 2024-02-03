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

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog } from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'
import { setErrorMessage } from './reducers/errorMessageReducer'

import deepFreeze from 'deep-freeze'


const App = () => {
    const dispatch = useDispatch()

    //const [blogs, setBlogs] = useState([])
    //const [notification, setNotification] = useState(null)
    //const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loggedUser, setLoggedUser] = useState(null)

    useEffect(() => {
        dispatch(initializeBlogs()) 
      }, []) 

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setLoggedUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const blogs = useSelector(({ blogs, notification, errorMessage }) => {
        return blogs
    })

    deepFreeze(blogs)
    const blogsCopied = [...blogs]
    blogsCopied.sort((a, b) => b.likes - a.likes)

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })
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
        } catch (e) {
            dispatch(setErrorMessage('Wrong username or password', 5))
        }
    }

    const handleLogOut = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setLoggedUser(null)
    }


    const blogFormRef = useRef()

    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()

        try {
            dispatch(createBlog(blogObject))
            dispatch(setNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`, 5))
        } catch (e) {
            dispatch(setErrorMessage(`Blog ${blogObject.title}can not be added`, 5))
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
                dispatch(setNotification(`A blog ${blogObject.title} by ${blogObject.author} has been deleted`, 5))
                /*
                setNotification(
                    `A blog ${blogObject.title} by ${blogObject.author} has been deleted`
                )
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
                */
                setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
            }
        } catch (exception) {
            //dispatch(setErrorMessage(`Blog ${blogObject.title} can not be added.`, 5))
            setErrorMessage(`Blog ${blogObject.title} can not be added.`, 5)
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
            dispatch(setErrorMessage(`A like for ${blogToUpdate.title} cannot be made.`, 5))
            /*
            setTimeout(() => {
                dispatch(setErrorMessage(null))
            }, 5000)
            */
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

                <ErrorMessage />

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

            <Notification />
            <ErrorMessage />

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
                {blogsCopied.map((blog) => (
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
