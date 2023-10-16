const blogRouter = require('express').Router()

const Blog = require('../models/blogs')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
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