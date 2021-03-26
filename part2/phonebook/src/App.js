import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

const PersonForm = (props) => {

  return (
    <div>
      <form onSubmit={props.addPerson}>
        <div>name: <input value={props.newName} onChange={props.handleNameChange} /></div>
        <div>number: <input value={props.newNum} onChange={props.handleNumChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Button = ({personClicked, persons, setPersons}) => {

  const handleDeletion = (event) => {
    event.preventDefault()

    window.confirm(`Delete ${personClicked.name}?`)
    ?
      personsService.remove(personClicked.id)
      .then(() => setPersons(persons.filter(person => person.id !== personClicked.id)))
    :
      alert(`${personClicked.name} kept in phonebook`)
      
    

  }

  return (
    <button type="submit" onClick={handleDeletion}>delete</button>
  )
}

const Persons = ({handleDeletion, persons, search, setPersons }) => {

  const personsToShow = search === ""
    ? persons
    : persons.filter(person => person.name.toLowerCase().startsWith(search.toLowerCase()))

  return (
    personsToShow.map(person => <p key={person.name}>{person.name} {person.number} <Button personClicked = {person} persons={persons} setPersons={setPersons}/></p>)
  )
}

const Filter = ({search, handleSearchChange}) => {
  
  return (
    <p>filter shown with<input value={search} onChange={handleSearchChange} /></p>
  )

}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNum,
    }
    personsService
      .create(nameObject)
      .then(returnedPerson => {
        persons.find(person => person.name === returnedPerson.name) 
        ?
        alert(`${returnedPerson.name} is already in the phonebook`)
        :
        setPersons(persons.concat(returnedPerson)) 
        setNewName('')
        setNewNum('')
      })
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNum={newNum}
        handleNameChange={handleNameChange} handleNumChange={handleNumChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} search={search} setPersons={setPersons} />
    </div>
  )
}

export default App
