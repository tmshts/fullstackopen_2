const listHelper = require('../utils/list_helper')

describe('most blogs', () => {

  // Empty blog
  const listWithNoBlog = []

  test('of empty list is zero', () => {
    const result = listHelper.mostBlogs(listWithNoBlog)
    expect(result).toEqual(0)
  })

  // One blog
  const listWithOneBlog = [
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    }
  ]

  const expectedAuthor = {
    'author': 'Edsger W. Dijkstra',
    'blogs': 1
  }

  test('when list has only one blog, equals most blog of that', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    //console.log(result)
    expect(result).toEqual(expectedAuthor)
  })

  // Many blogs with one author with most blogs
  const listWithManyBlogsOneMostBlogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fu',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 12,
      __v: 0
    }
  ]

  const expectedAuthor1 =
        {
          author: 'Robert C. Martin',
          blogs: 2
        }

  test('for many blogs with one author of most blogs, returns the one', () => {
    const result = listHelper.mostBlogs(listWithManyBlogsOneMostBlogs)
    //console.log(result)
    expect(result).toEqual(expectedAuthor1)
  })


  // Many blogs with more authors with most blogs
  const listWithManyBlogsMoreMostBlogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fu',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 12,
      __v: 0
    }
  ]

  const expectedAuthor2 = [
    {
      author: 'Robert C. Martin',
      blogs: 2
    },
    {
      author: 'Edsger W. Dijkstra',
      blogs: 2
    }
  ]

  test('for many blogs with more authors of most blogs, returns one of them', () => {
    const result = listHelper.mostBlogs(listWithManyBlogsMoreMostBlogs)
    //console.log(result)
    expect(result).toEqual(expectedAuthor2[0])
  })

})
