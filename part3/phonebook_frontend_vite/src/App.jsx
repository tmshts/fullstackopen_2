import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
//import axios from 'axios'
import noteService from './services/persons'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(response => {
        setPersons(response)
      })
}, [])
// firstly, app is rendered with no fetching data
// secondly, effect for fetching data from server thanks to axios is triggered immediatelly after first rendering
// thirdly, response updates the state persons and hence app is rendered for second time
console.log('render', persons.length, 'persons')


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) => {
    //console.log(event.target.value)
    setSearchName(event.target.value)
  }

  const handleDeletePerson = (id, name) => {

    if (window.confirm(`Delete ${name}?`)) {
      noteService
      .deletePerson(id).then(noReturnedPerson => {
        setErrorMessage(
          `${name} was successfully deleted`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `Information of ${name} was already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      setPersons(persons.filter(person => person.id !== id))
    }
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    let counter = 0
    persons.map(person => {
      const changed_id = person.id

      if (person.name.toUpperCase() === newName.toUpperCase() && person.number === newNumber) {
        setErrorMessage(
          `${newName} is already added to phonebook`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000) 
      }
      else if (person.name.toUpperCase() === newName.toUpperCase() && person.number !== newNumber) {
        if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {

          const person = persons.find(person => person.id === changed_id)
          const changedPerson = { ...person, number: newNumber }

          noteService
            .updateNumber(changed_id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== changed_id ? person : returnedPerson))
              setErrorMessage(
                `The phone number of ${returnedPerson.name} was changed to ${returnedPerson.number}.`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000) 
              })
            .catch(error => {
              // this is the way to access the error message
              //console.log(error.response.data.error)
              setErrorMessage(error.response.data.error)
              setTimeout(() => {
                setErrorMessage(null)
              }, 12000) 
            })       
        }
      }
      else {
        counter++
      }
    })
    if (counter === persons.length){
      const personObject = {
        //id: persons.length + 1,
        name: newName,
        number: newNumber
      }
      noteService
        .createPerson(personObject)
        .then(returnedPerson => {
          // After updating the state of the App -> the new note is rendered to the screen.
          setPersons(persons.concat(returnedPerson))
          setErrorMessage(
            `Added ${returnedPerson.name}.`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000) 
        })
        .catch(error => {
          // this is the way to access the error message
          //console.log(error.response.data.error)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 12000) 
        })
    }
    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter handleSearchName={handleSearchName} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} handleNameChange={handleNameChange} newName={newName}
        handleNumberChange={handleNumberChange} newNumber={newNumber} true={true} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchName={searchName} handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App