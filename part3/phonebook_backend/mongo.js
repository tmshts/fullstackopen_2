const mongoose = require('mongoose')

/*
process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
  });
*/

if (process.argv.length<3) {
  console.log('password as command-line argument is missing')
  process.exit(1)
}
if (process.argv.length===4) {
  console.log('name or number as command-line argument is missing')
  process.exit(1)
}
if (process.argv.length>5) {
  console.log('too many command-line arguments')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://tomhatas:${password}@phonebook.io1iz0d.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

// Define schema and matching model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// Add new person into phonebook
if (process.argv.length>=4 && process.argv.length<=5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    //console.log(result)
    console.log('added ' + name + ' number ' +  number + ' to phonebook')
    mongoose.connection.close()
  })
}

// command-line argument without any person -> get full phonebook
else if (process.argv.length===3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    let count = 0
    result.forEach(person => {
      console.log(person.name + ' ' + person.number)
      count++
    })
    if (count===0) {
      console.log('no entries yet')
    }
    mongoose.connection.close()
  })
}