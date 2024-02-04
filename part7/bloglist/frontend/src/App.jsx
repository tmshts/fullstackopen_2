import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import './index.css'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { storeSignInUser, storeSignInUserEffect, removeSignInUser } from './reducers/signUsersReducer'

const App = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        dispatch(initializeBlogs()) 
      }, []) 

    const blogs = useSelector(({ blogs, signUser, notification, errorMessage }) => {
        return blogs
    })

    const signUser = useSelector(({ blogs, signUser, notification, errorMessage }) => {
        return signUser
    })
    
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(storeSignInUserEffect(user))
        }
    }, [])
    
    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(storeSignInUser({ username, password }))
        setUsername('')
        setPassword('')
    }

    const handleLogOut = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        dispatch(removeSignInUser())
    }

    const blogFormRef = useRef()

    const addBlog = async () => {
        blogFormRef.current.toggleVisibility()
    }

    const blogForm = () => {
        return (
            <div>
                <Togglable buttonLabel="new note" ref={blogFormRef}>
                    <BlogForm
                        createBlogForm={addBlog}
                    />
                </Togglable>
            </div>
        )
    }

    if (signUser === null) {
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
                    {signUser.name} logged in
                    <button className="log_out" onClick={handleLogOut}>
                        logout
                    </button>
                </p>
            </div>

            {blogForm()}

            <div>
                {blogs.slice().sort((a, b) => b.likes - a.likes).map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                        />
                    ))}
            </div>
        </div>
    )
}

export default App
