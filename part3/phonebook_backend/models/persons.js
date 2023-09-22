
// CONNECTION to database
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// not used this connection to database
/*
// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const password = ' '
const url =
  `mongodb+srv://tomhatas:${password}@phonebook.io1iz0d.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)
*/

// Define schema and matching model
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        //return /\d{2,3}-/.test(v);
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid format phone number! The phone number must be be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers. Eg. 09-1234556 and 040-22334455 are valid phone numbers.`
    },
    required: true
  },
})


// to format the objects returned by Mongoose is to modify the toJSON method of the schema
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    //console.log(typeof(returnedObject.id))
  }
})

// replaced with module.exports
//const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)
