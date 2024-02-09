const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {
        url: 1,
        title: 1,
        author: 1,
        id: 1,
        comments: 1
    })
    response.json(users)
})

usersRouter.get('/:id', async (request, response, next) => {
    try {
        const user = await User.findById(request.params.id)

        if (!user) {
            response.status(404).json({ error: 'User ID does not exist' })
        } else {
            response.status(200).json(user)
        }
    } catch (exception) {
        next(exception)
    }
})

usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body

    if (!username || !password) {
        return response
            .status(400)
            .json({ error: 'Both username and password must be given' })
    }

    if (password.length < 3) {
        return response.status(400).json({
            error: 'Both username and password must be at least 3 characters long',
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter
