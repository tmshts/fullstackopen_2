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

afterAll(async () => {
  await mongoose.connection.close()
})