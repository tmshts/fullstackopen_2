/*
Use the supertest package for writing a test that makes an HTTP GET request to the /api/blogs URL.
*/

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blogs = require('../models/blogs')
const helper = require('./test_helper')
// const error = require('../utils/logger')
mongoose.set('bufferTimeoutMS', 30000)

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

describe('Verify that if the likes property is missing from the request, it will default to the value 0', () => {
  test('Likes property missing -> default to value 0', async () => {

    const newBlogPost = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
      // likes: 12
    }

    // const resultedBlog = await api
    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    // console.log(resultedBlog.body.likes)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  }, 10000)
})

describe('Verify that if the title or url properties are missing, the backend responds with status code 400 Bad Request.', () => {
  test('Title property missing -> status code 400 bad request', async () => {

    const newBlogPost = {
      // title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlog.length)
  }, 10000)


  test('URL property missing -> status code 400 bad request', async () => {

    const newBlogPost = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      //url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlog.length)
  }, 10000)
})


afterAll(async () => {
  await mongoose.connection.close()
})