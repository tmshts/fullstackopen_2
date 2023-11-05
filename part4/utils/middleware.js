// const logger = require('./logger')

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


module.exports = {
  errorHandler, tokenExtractor
}