// so that the mongo_uri can be read
require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const app = express()

// show static content where is build the front-end
app.use(express.static('dist'))

app.use(express.json())
//app.use(morgan('tiny'))

// server is in localhost port 3001 BUT frontend is in localhost port 3000 -> To have some origin - middleware cors
const cors = require('cors')
app.use(cors())

//creating body token
morgan.token('body', (request) => {
  //console.log(request.method)
  return request.method === 'POST' ? JSON.stringify(request.body) : ' '
})

// tiny and customization
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// to get schema and model
const Person = require('./models/persons')

// express error handling into middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  //console.error(error.name)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

const unknownEndpoint = (request, response) => {
  //console.log(request)
  response.status(404).send({ error: 'unknown endpoint' })
}

// Extracted to models -> persons.js
/*
// CONNECTION to database
const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const password = 'Risco151'
const url =
  `mongodb+srv://tomhatas:${password}@phonebook.io1iz0d.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

// Define schema and matching model
const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
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

const Person = mongoose.model('Person', personSchema)
*/

/*
let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    },
    {
      "id": 5,
      "name": "Test Test",
      "number": "54755"
    }
]
*/

// before connecting to database
/*
app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
*/

app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

app.get('/info', (request, response) => {
  const date = new Date()
  //console.log(typeof(Person))
  Person.find({}).then(person => {
    //console.log(typeof(person))
    //console.log(person)
    response.send(`<p>Phonebook has info for ${person.length} people.</p><p>${date}</p>`)
  })
})

//app.get('/api/persons/:id', (request, response) => {
// no need anymore since we use Mongo
/*
  //const id = Number(request.params.id)
  ///console.log(id)
  const person = persons.find(person => {
    //console.log(person.id, typeof person.id, id, typeof id, person.id === id)
    return person.id === id
  })
  //console.log(person)
  */

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    // 2. option
    //.catch(error => {
    //console.log(error)
    // 1. option
    //response.status(500).end()
    //response.status(400).send({ error: 'malformatted id' })
    //})
    .catch(error => next(error))
})

/*
    if (person) {
        response.json(person)
      }
    else {
        response.status(404).end()
      }
      */

// not needed since mongo creates id automatically
/*
const generateId = () => {
    const max_number = 10000000000000
    const id = Math.floor(Math.random() * max_number)
    return id
  }
*/

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // 1. option for name missing
  // if (body.name === undefined)

  // 2. option for name missing
  /*
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
    */

  /*
  if (persons.find(person => person.name === body.name)) {
      return response.status(400).json({
          error: 'name must be unique'
        })
  }
  */

  //not used anymore
  /*
  const person = {
      id: generateId(),
      name: body.name,
      number: body.number
  }
  //console.log(person)
  //console.log(request.headers)
  persons = persons.concat(person)
  response.json(person)
  })
  */

  const person = new Person({
    //id: generateId(),
    name: body.name,
    number: body.number
  })

  // 3. option for name missing -> write contrainsts in mongo.js and use next() - add next to the post argument as well
  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {

  const { name, number } = request.body
  // original option
  /* const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  */

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      console.log('found')
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      //console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})

/*
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })
*/

app.use(unknownEndpoint)
// this has to be the last loaded middleware.
app.use(errorHandler)

// So that data can be hosted in 3001 or on e. g. fly
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// not needed anymore
/*
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
*/