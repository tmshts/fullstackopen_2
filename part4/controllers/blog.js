const blogRouter = require('express').Router()

const Blog = require('../models/blogs')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response
    .json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

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