const blogRouter = require('express').Router()
const Blog = require('../models/blogs')
const Comment = require('../models/comments')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('comments', {
        content: 1,
        id: 1
        })
        .populate('user', {
        username: 1,
        name: 1,
        id: 1,
        })
    response.json(blogs)
})

blogRouter.get('/comments', async (request, response, next) => {
    try {
        const comments = await Comment.find({})
        response.status(200).json(comments)
    } catch (exception) {
        next(exception)
    }

})

blogRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
            .populate('comments', {
                content: 1,
                id: 1
        })

        if (!blog) {
            response.status(404).json({ error: 'Blog ID does not exist' })
        } else {
            response.status(200).json(blog)
        }
    } catch (exception) {
        next(exception)
    }
})

blogRouter.get('/:id/comments', async (request, response, next) => {
    try {
        const blog_id = request.params.id
        const blog = await Blog.findById(blog_id)
        const comments = blog.comments
    
        const all_comments = await Comment.find({ _id: comments })
    
        response.status(200).json(all_comments)
    } catch (exception) {
        next (exception)
    }

})

blogRouter.delete(
    '/:id',
    middleware.userExtractor,
    async (request, response, next) => {

        try {
            const user = request.user

            const blog = await Blog.findById(request.params.id)

            if (!blog) {
                response.status(404).json({ error: 'Blog ID does not exist' })
            } else if (blog.user.toString() === user.id.toString()) {
                await Blog.findByIdAndRemove(request.params.id)
                response.status(204).end()
            } else {
                response.status(401).json({ error: 'Unauthorized' })
            }
        } catch (exception) {
            next(exception)
        }
    }
)

blogRouter.put('/:id', async (request, response) => {
    const updatedBlog = request.body

    const returnedBlogsFromBackend = await Blog.findByIdAndUpdate(
        request.params.id,
        updatedBlog,
        { new: true }
    )

    response.status(200).json(returnedBlogsFromBackend)
})

blogRouter.post(
    '/',
    middleware.userExtractor,
    async (request, response, next) => {
        const body = request.body

        try {
            const user = request.user

            const blog = new Blog({
                title: body.title,
                author: body.author,
                url: body.url,
                likes: body.likes,
                user: user.id,
            })

            if (!blog.title || !blog.url) {
                return response
                    .status(400)
                    .json({ error: 'Title or URL are missing' })
            }

            if (!blog.likes) {
                blog.likes = 0
            }

            const savedBlog = await blog.save()

            user.blogs = user.blogs.concat(savedBlog._id)
            await user.save()

            response.status(201).json(savedBlog)
        } catch (exception) {
            next(exception)
        }
    }
)

blogRouter.post('/:id/comments', async (request, response, next) => {
    const { content } = request.body

    if (!content) {
        return response
            .status(400)
            .json({ error: 'Comment can not be empty.' })
    }


    const blog = await Blog.findById(request.params.id)

    const comment = new Comment({
        content: content,
        blog: blog.id,
    })

    try {
        const savedComment = await comment.save()
        blog.comments = blog.comments.concat(savedComment._id)
        await blog.save()
        response.status(201).json(savedComment)
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogRouter
