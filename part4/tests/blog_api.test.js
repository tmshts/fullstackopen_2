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

// superagent object
const api = supertest(app)

let loggedInToken = ''

beforeEach(async () => {

  await Blogs.deleteMany({})

  const blogObject = helper.initialBlog
    .map(blog => new Blogs(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)

  //login to test database to get user's token
  /// assumption this user was already created :)
  const username = 'tmshts'
  const password = 'tmshts'

  const result = await api
    .post('/api/login')
    .send({ username: username, password: password })

  loggedInToken = result.body.token

})



describe('When there are initially some blogs saved', () => {

  test('Blogs are returned as json', async () => {
    console.log('entered test')
    await api
      .get('/api/blogs')
      .expect(200)
    // using regex
      .expect('Content-Type', /application\/json/)
  })


  test('Correct amount of blogs is returned', async () => {
    const response = await api.get('/api/blogs')
    //console.log(response)
    expect(response.body).toHaveLength(helper.initialBlog.length)
  })
})



describe('Viewing a specific blog', () => {

  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })


  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = 'jlkjlkl454'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})



describe('Verify that the unique identifier property of the blog posts is named id', () => {

  test('Unique identifier property of blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    //console.log(response.body[0].id)
    expect(response.body[0].id).toBeDefined()
  })
})



describe('Addition of a new blog', () => {

  test('Succeeds with valid data', async () => {
    const newBlogPost = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loggedInToken}`)
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
      .set('Authorization', `bearer ${loggedInToken}`)
      .send(newBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    // console.log(resultedBlog.body.likes)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  }, 10000)


  test('Title property missing -> status code 400 bad request', async () => {
    const newBlogPost = {
    // title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loggedInToken}`)
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
      .set('Authorization', `bearer ${loggedInToken}`)
      .send(newBlogPost)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlog.length)
  }, 10000)


  test('blog fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
    const newBlogPost = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      //url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ')
      .send(newBlogPost)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlog.length)
  }, 10000)

})


// not working -> reason: all the data in test blogs are not created by users (without token) ->
// when deleting the blog, the user's token is missing because no user created this blog :)
describe('Deletion of a blog', () => {

  test('Succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length-1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      // not working with set
      .set('Authorization', `bearer ${loggedInToken}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlog.length - 1)
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})



describe('Update of a blog', () => {
  test('Update of likes of first blog for 100', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlogPost = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 100
    }

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlogPost)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(updatedBlog.body.likes).toBe(100)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})