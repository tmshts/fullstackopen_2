//// added by me ////
//console.log('hello world')
require('dotenv').config()
const logger = require('./utils/logger')
const config = require('./utils/config')

const blogsRouter = require('./controllers/blog')
////

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')

const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
app.use(express.json())

const mongoose = require('mongoose')

app.use(middleware.tokenExtractor)
// use userExtractor middleware in the entire app
//app.use(middleware.userExtractor)

//// added by me ////
const mongoUrl = config.MONGODB_URI
logger.info('connecting to', mongoUrl)

// use userExtractor middleware only in /api/blogs routes
//app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(cors())

// handle API endpoint for backend testing with cypress
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

////
app.use(middleware.errorHandler)

// const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl)

module.exports = app
