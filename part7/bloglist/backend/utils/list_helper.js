var _ = require('lodash')

/* no-unused-vars */
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    const reducer = (previousValue, currentValue) => {
        return previousValue.likes > currentValue.likes
            ? previousValue
            : currentValue
    }

    const returnedObject = blogs.reduce(reducer)
    //console.log(returnedObject)
    const resultObject = {
        title: returnedObject.title,
        author: returnedObject.author,
        likes: returnedObject.likes,
    }
    return resultObject
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    const composed_aggregate_object = _.countBy(blogs, 'author')
    //console.log(composed_aggregate_object)
    let amount_of_blogs = _.max(
        Object.values(composed_aggregate_object),
        (o) => composed_aggregate_object[o]
    )
    //console.log(amount_of_blogs)

    function getKeyByValue(object, value) {
        return Object.keys(object).find((key) => object[key] === value)
    }
    let name_of_author = getKeyByValue(
        composed_aggregate_object,
        amount_of_blogs
    )
    //console.log(name_of_author)

    const resultObject = {
        author: name_of_author,
        blogs: amount_of_blogs,
    }
    return resultObject
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    const totalResultObject = _(blogs)
        .groupBy('author')
        .map((author, likes) => ({
            author: likes,
            likes: _.sumBy(author, 'likes'),
        }))
        .value()
    //console.log(totalResultObject)

    const author_max_likes = _.maxBy(totalResultObject, 'likes')
    //console.log(author_max_likes)
    return author_max_likes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}
