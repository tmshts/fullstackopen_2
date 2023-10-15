const blogRouter = require('express').Router()

const Blog = require('../models/blogs')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response
    .json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  try {
    const savedBlog = await blog.save()
    response
      .status(201)
      .json(savedBlog)
  } catch {
    response
      .status(400)
      .end()
  }

})

module.exports = blogRouter