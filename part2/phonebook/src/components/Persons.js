import personsService from '../services/persons'

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

  export default Persons