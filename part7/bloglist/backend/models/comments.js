const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: String,
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    },
})

// to format the objects returned by Mongoose is to modify the toJSON method of the schema
commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Comment', commentSchema)
