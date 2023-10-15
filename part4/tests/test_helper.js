const Blog = require('../models/blogs')

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

module.exports = {
  initialBlog, blogsInDb
}