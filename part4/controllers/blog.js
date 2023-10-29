const blogRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('bearer ')) {
    return authorization.replace('bearer ', '')
  }
  return null
}


blogRouter.get('/', async (request, response) => {

  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id:1 })
  response
    .json(blogs)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response
    .status(204)
    .end()
})

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = {
    title: title,
    author: author,
    url: url,
    likes: likes
  }

  await Blog
    .findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  // console.log('found')
  response
    .status(200)
    .json(updatedBlog)
})

blogRouter.post('/', async (request, response) => {

  const body = request.body

  // Token logic
  // The object decoded from the token contains the username and id fields, which tell the server who made the request.
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  // replaced by token
  // const user = await User.findById(body.userId)

  // const blog = new Blog(body)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  if (!blog.title || !blog.url) {
    return response
      .status(400)
      .json({ error: 'Title or URL are missing' })
  }

  if (!blog.likes) {
    blog.likes = 0
  }

  try {
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response
      .status(201)
      .json(savedBlog)
  } catch (error) {
    //console.log(error)
    response
      .status(400)
      .end()
  }
})

module.exports = blogRouter