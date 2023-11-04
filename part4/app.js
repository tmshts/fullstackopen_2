//// added by me ////
//console.log('hello world')
require('dotenv').config()
const logger = require('./utils/logger')
const config = require('./utils/config')

const blogRouter = require('./controllers/blog')
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

//// added by me ////
const mongoUrl = config.MONGODB_URI
logger.info('connecting to', mongoUrl)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(cors())
////
app.use(middleware.errorHandler)


// const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl)


module.exports = app