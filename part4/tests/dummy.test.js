const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  // Empty blog
  const listWithNoBlog = []

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithNoBlog)
    expect(result).toBe(0)
  })

  // One blog
  const listWithOneBlog = [
    {
      _id: '6512c35e659b9299234dadb1',
      title: 'w3',
      author: 'tmshts',
      url: 'https://www.w3.org/',
      likes: 45,
      __v: 0
    }
  ]
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(45)
  })

  // Many blogs
  const listWithManyBlogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
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
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })
})


describe('top favorites', () => {

  // Empty blog
  const listWithNoBlog = []

  test('of empty list is zero', () => {
    const result = listHelper.favoriteBlog(listWithNoBlog)
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

  const expectedObject = {
    'title': 'Canonical string reduction',
    'author': 'Edsger W. Dijkstra',
    'likes': 12
  }

  test('when list has only one blog, equals top favorite of that', () => {

    const result = listHelper.favoriteBlog(listWithOneBlog)
    //console.log(result)
    //console.log(expectedObject)
    expect(result).toEqual(expectedObject)
  })

  // Many blogs with 1 favorite
  const listWithManyBlogsOneFavorite = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
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
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]

  const expectedObjectOneFavorite = {
    'title': 'Canonical string reduction',
    'author': 'Edsger W. Dijkstra',
    'likes': 12
  }

  test('for many blogs with one favorite, returns the one', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogsOneFavorite)
    //console.log(result)
    //console.log(expectedObjectOneFavorite)
    expect(result).toEqual(expectedObjectOneFavorite)
  })


  // Many blogs with more favorites
  const listWithManyBlogsMoreFavorites = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
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
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]

  const expectedListMoreFavorite = [
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      likes: 12
    }
  ]

  test('for many top favorites, returns the first one of them', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogsMoreFavorites)
    //console.log(result)
    //console.log(expectedListMoreFavorite)
    expect(result).toEqual(expectedListMoreFavorite[1])
  })

})

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
    //console.log(expectedObjectOneFavorite)
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
    //console.log(expectedObjectOneFavorite)
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
    //console.log(expectedObjectOneFavorite)
    expect(result).toEqual(expectedAuthor2[0])
  })


})
