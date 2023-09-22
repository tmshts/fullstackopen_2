const PersonForm = (props) => {
    return (
      <form onSubmit={props.onSubmit}>
        <div>
          <div>name: <input onChange={props.handleNameChange} value={props.newName} required={true} type='text' /></div>
          <div>number: <input onChange={props.handleNumberChange} value={props.newNumber} required={props.true} type='text'/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

export default PersonForm