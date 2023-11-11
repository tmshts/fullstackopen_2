const Blog = require('../models/blogs')
const User = require('../models/user')


const initialBlog = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const blogsInDb = async () => {
  const blogPosts = await Blog.find({})
  //console.log(blogPosts)
  return blogPosts.map(blogPost => blogPost.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'unknown',
    url: 'www.unknownpoint.org',
    likes: 8,
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

module.exports = {
  initialBlog, blogsInDb, usersInDb, nonExistingId
}