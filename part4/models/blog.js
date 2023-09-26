const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

// to format the objects returned by Mongoose is to modify the toJSON method of the schema
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      //console.log(typeof(returnedObject.id))
    }
  })

module.exports = mongoose.model('Blog', blogSchema)
