const bcrypt = require('bcrypt')
const User = require('../models/user')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
// const error = require('../utils/logger')
mongoose.set('bufferTimeoutMS', 30000)

// superagent object
const api = supertest(app)


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({ username: 'mluukkai', passwordHash, name:'Matti Luukkainen' })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'tmshts',
      name: 'tmshts',
      password: 'tmshts',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(result.body.error)
    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }, 10000)


  test('creation fails with proper statuscode and message if username not given', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      // username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(result.body.error)
    expect(result.body.error).toContain('Both username and password must be given')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }, 10000)

  test('creation fails with proper statuscode and message if password not given', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      // password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(result.body.error)
    expect(result.body.error).toContain('Both username and password must be given')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }, 10000)


  test('creation fails with proper statuscode and message if username is not longer than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'pe',
      name: 'Superuser',
      password: 'petr',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(result.body.error)
    expect(result.body.error).toContain(`User validation failed: username: Path \`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length (3)`)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }, 10000)


  test('creation fails with proper statuscode and message if password is not longer than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'petr',
      name: 'Superuser',
      password: 'pe',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(result.body.error)
    expect(result.body.error).toContain('Both username and password must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }, 10000)

  test('creation succeeds with another user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'tmshts',
      name: 'tmshts',
      password: 'tmshts',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // console.log(result.body.error)
    // expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  }, 10000)

})