import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import Persons from './components/Persons'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'

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
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [color, setColor] = useState('green')

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

    const oldPerson = persons.find(person => person.name === nameObject.name)
    console.log(oldPerson)
    oldPerson
    ? window.confirm(`${nameObject.name} is already in the phonebook, replace the old number with a new one?`)
      ? personsService
          .update(persons.find(person => person.name === nameObject.name).id, nameObject)
          .then((returnedPerson)=> {
            setNotificationMessage(
              `${returnedPerson.name}'s number has been updated`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.number !== oldPerson.number).concat(returnedPerson))
            setNewName('')
            setNewNum('')
          })
          .catch(error => {
            setColor('red')
            setNotificationMessage(`Information of ${nameObject.name} has already been removed from the server`)
            setTimeout(() => {
              setColor('green')
              setNotificationMessage(null)
            }, 5000)
          })
      : window.close()
    : personsService
      .create(nameObject)
      .then(returnedPerson => {
        setNotificationMessage(
          `${returnedPerson.name} was successfully added to Phonebook`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setPersons(persons.concat(returnedPerson)) 
        setNewName('')
        setNewNum('')
      }).catch(error => {
        setColor('red')
        setNotificationMessage(
          `${error.response.data.error}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
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
      <Notification message={notificationMessage} color={color}/>
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
