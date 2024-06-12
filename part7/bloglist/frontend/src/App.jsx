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
  
import styled from 'styled-components'

const LogoutButton = styled.button`
    color: #BF4F74;
    margin: 0.5em;
    padding: 0.25em 1em;
    border: 2px solid white;
    border-radius: 10px;
    &:focus {
        outline: none
`

const Page = styled.div`
  padding: 1em;
`

const Navigation = styled.div`
  background: #83677B;
  padding: 1em;
  color: white;
`

const Footer = styled.div`
background: #ADADAD;
padding: 1em;
margin-top: 1em;
`

const padding = {
    padding: 5,
    color: "white",
    fontSize: 20,
    textDecoration: "none"
}


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
                <h2 className='loginh2'>Login</h2>

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
            <Page>
                <Navigation>
                    <div className='parent'>
                        <div className='child1'>
                            <Link style={padding} to="/">Blogs</Link>
                            <Link style={padding} to="/users">Users</Link>
                        </div>
                        <div className='child2'>
                            <em> {signUser.name} logged in</em>
                            <LogoutButton className="log_out" onClick={handleLogOut}>
                                logout
                            </LogoutButton>
                        </div>
                    </div>

                </Navigation>

                <Routes>
                    <Route path="/" element={<Blogs blogs={blogs} />} />
                    <Route path="/blogs/:id" element={<Blog />} />
                    <Route path="/users" element={<Users users={users} />} />
                    <Route path="/users/:id" element={<User />} />
                </Routes>
                
                <Footer>
                    <em>© 2024 <a href="https://github.com/tmshts" target="_blank" rel="noopener noreferrer">tmshts</a>. All rights reserved.</em>
                </Footer>
            </Page>
        </Router>
    )
}

export default App
