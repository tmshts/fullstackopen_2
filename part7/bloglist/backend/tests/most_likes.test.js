const listHelper = require('../utils/list_helper')

describe('most likes', () => {
    // Empty blog
    const listWithNoBlog = []

    test('of empty list is zero', () => {
        const result = listHelper.mostLikes(listWithNoBlog)
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
            __v: 0,
        },
    ]

    const expectedAuthor3 = {
        author: 'Edsger W. Dijkstra',
        likes: 12,
    }

    test('when list has only one blog, equals most likes of that', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        //console.log(result)
        expect(result).toEqual(expectedAuthor3)
    })

    // Many blogs
    const listWithManyBlogsOneMostLikesBlogs = [
        {
            _id: '5a422a851b54a676234d17f7',
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
            __v: 0,
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0,
        },
        {
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0,
        },
        {
            _id: '5a422b891b54a676234d17fa',
            title: 'First class tests',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
            likes: 10,
            __v: 0,
        },
        {
            _id: '5a422ba71b54a676234d17fb',
            title: 'TDD harms architecture',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
            likes: 0,
            __v: 0,
        },
        {
            _id: '5a422bc61b54a676234d17fc',
            title: 'Type wars',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
            likes: 2,
            __v: 0,
        },
    ]

    const expectedAuthor4 = {
        author: 'Edsger W. Dijkstra',
        likes: 17,
    }

    test('for many blogs with one author of most likes blogs, returns the one', () => {
        const result = listHelper.mostLikes(listWithManyBlogsOneMostLikesBlogs)
        //console.log(result)
        expect(result).toEqual(expectedAuthor4)
    })

    // Many blogs with more authors with most likes
    const listWithManyBlogsMoreMostLikesBlogs = [
        {
            _id: '5a422a851b54a676234d17f7',
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
            __v: 0,
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0,
        },
        {
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0,
        },
        {
            _id: '5a422b891b54a676234d17fa',
            title: 'First class tests',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
            likes: 10,
            __v: 0,
        },
        {
            _id: '5a422ba71b54a676234d17fb',
            title: 'TDD harms architecture',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
            likes: 0,
            __v: 0,
        },
        {
            _id: '5a422bc61b54a676234d17fc',
            title: 'Type wars',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
            likes: 7,
            __v: 0,
        },
    ]

    const expectedAuthor5 = [
        {
            author: 'Edsger W. Dijkstra',
            likes: 17,
        },
        {
            author: 'Robert C. Martin',
            likes: 17,
        },
    ]

    test('for many blogs with more authors of most likes blogs, returns one of them', () => {
        const result = listHelper.mostLikes(listWithManyBlogsMoreMostLikesBlogs)
        //console.log(result)
        expect(result).toEqual(expectedAuthor5[0])
    })
})
