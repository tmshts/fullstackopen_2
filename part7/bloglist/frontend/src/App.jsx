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
import { initializeUsers } from './reducers/usersReducer'
import { storeSignInUser, storeSignInUserEffect, removeSignInUser } from './reducers/signUsersReducer'

import {
    BrowserRouter as Router,
    Routes, Route, Link, useParams
  } from 'react-router-dom'
  

const App = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        dispatch(initializeBlogs()) 
      }, [])

    useEffect(() => {
        dispatch(initializeUsers()) 
      }, [])

    const blogs = useSelector(({ blogs, users, signUser, notification, errorMessage }) => {
        return blogs
    })

    const signUser = useSelector(({ blogs, users, signUser, notification, errorMessage }) => {
        return signUser
    })

    const users = useSelector(({ blogs, users, signUser, notification, errorMessage }) => {
        return users
    })

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(storeSignInUserEffect(user))
        }
    }, [])

    const Users = ({ users }) => (
        <>
          <h2>Users</h2>
          <table>
            <tbody>
                    <tr>
                        <td> </td>
                        <td>
                            <div><b>blogs created</b></div>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    {users.map(user =>
                    <tr key={user.id}>
                        <td>
                            <Link to={`/users/${user.id}`}>
                                {user.name}
                            </Link>
                        </td>
                        <td>
                            {user.blogs.length}
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </>
    )

    const Blogs = ({blogs}) => {
        return (
            <div>
                <h2>Blog app</h2>

                <Notification />
                <ErrorMessage />

                {blogForm()}

                {blogs.map(blog =>
                <div key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title}
                    </Link>
                </div>
                )}
          </div>
        )
    }

    const User = ({ users }) => {
        const id = useParams().id

        const user = users.find(user => user.id === id)

        if (!user) {
            return null
          }
        const blogs = user.blogs

        if (blogs.length === 0) {
            return (
                <div>
                    <h4>{user.name} has not added any blogs</h4>
                </div>
            )
          }

        return (
          <div>
                <h2>{user.name}</h2>

                <h4><b>added blogs</b></h4>

                    {blogs.map((blog) => (
                        <div key={blog.id}>
                            <ul>
                                <li>{blog.title}</li>
                            </ul>
                        </div>
                    ))}
          </div>
        )
      }

    
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
                <Togglable buttonLabel="create new" ref={blogFormRef}>
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
        <Router>
            <div>
                <Link to="/">blogs</Link>
                <Link to="/users">users</Link>

                {signUser.name} logged in
                    <button className="log_out" onClick={handleLogOut}>
                        logout
                    </button>

                <Routes>
                    <Route path="/" element={<Blogs blogs={blogs} />} />
                    <Route path="/blogs/:id" element={<Blog blogs={blogs} />} />
                    <Route path="/users" element={<Users users={users} />} />
                    <Route path="/users/:id" element={<User users={users} />} />
                </Routes>
                
                <div>

                </div>
            </div>
        </Router>
    )
}

export default App
