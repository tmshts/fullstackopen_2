/*
Use the supertest package for writing a test that makes an HTTP GET request to the /api/blogs URL.
*/

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blogs = require('../models/blogs')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blogs.deleteMany({})

  const blogObject = helper.initialBlog
    .map(blog => new Blogs(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})

// superagent object
const api = supertest(app)

describe('Verify that the blog list application returns the correct amount of blog posts in the JSON format', () => {

  test('blogs are returned as json', async () => {
    console.log('entered test')
    await api
      .get('/api/blogs')
      .expect(200)
    // using regex
      .expect('Content-Type', /application\/json/)
  })

  test('correct amount of blog posts is returned', async () => {
    const response = await api.get('/api/blogs')
    //console.log(response)
    expect(response.body).toHaveLength(helper.initialBlog.length)
  })
})

describe('Verify that the unique identifier property of the blog posts is named id', () => {
  test('Unique identifier property of blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    //console.log(response.body[0].id)
    expect(response.body[0].id).toBeDefined()
  })
})

describe('Verify that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post', () => {
  test('HTTP POST request to the /api/blogs URL successfully creates a new blog post', async () => {
    const newBlogPost = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlog.length + 1)

    const title = blogsAtEnd.map(n => n.title)
    expect(title).toContain(
      'Canonical string reduction'
    )
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})