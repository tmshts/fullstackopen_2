const Person = ({ person, handleDeletePerson }) => {
    return (
      <div>
          <p>{person.name}  {person.number} <button onClick={ () => handleDeletePerson(person.id, person.name) }>delete</button></p>
      </div>
    )
  }
  
  export default Person