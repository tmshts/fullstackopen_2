// const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// express error handling into middleware
const errorHandler = (error, request, response, next) => {
  //logger.error(error.message)
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  // code that extracts the token
  if (request.path === '/api/blogs' && request.method === 'POST') {
    const header_authorization = request.headers.authorization
    const result = header_authorization.split(' ')
    //console.log(result[1])
    const bearer_token = result[1]
    request.token = bearer_token
  } else if (request.method === 'DELETE') {
    const header_authorization = request.headers.authorization
    const result = header_authorization.split(' ')
    //console.log(result[1])
    const bearer_token = result[1]
    request.token = bearer_token
  }
  next()
}

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response
        .status(401)
        .json({ error: 'token invalid' })
    } else {
    // find out who is token holder
      const user = await User.findById(decodedToken.id)
      request.user = user
    }
  }
  catch(exception) {
    next(exception)
  }
  next()
}


module.exports = {
  errorHandler, tokenExtractor, userExtractor
}