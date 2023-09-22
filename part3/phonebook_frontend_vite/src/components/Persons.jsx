import Person from './Person'

const Persons = ({persons, searchName, handleDeletePerson}) => {
  return (
      <div>
      {persons.filter(person => {
          if (searchName == '') {
            return person
          } else if (person.name.toUpperCase().includes(searchName.toUpperCase())) {
            return person
          }
      }).map(person =>
        <Person key={person.id} person={person} handleDeletePerson={handleDeletePerson}/>
        )
      }
      </div>
  )
}

export default Persons