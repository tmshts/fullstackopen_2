import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import ErrorMessage from './components/ErrorMessage'
import LoginForm from './components/LoginForm'
import './index.css'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { storeSignInUser, storeSignInUserEffect, removeSignInUser } from './reducers/signUsersReducer'

import {
    BrowserRouter as Router,
    Routes, Route, Link
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
                    <Route path="/blogs/:id" element={<Blog />} />
                    <Route path="/users" element={<Users users={users} />} />
                    <Route path="/users/:id" element={<User />} />
                </Routes>
                
                <div>

                </div>
            </div>
        </Router>
    )
}

export default App
