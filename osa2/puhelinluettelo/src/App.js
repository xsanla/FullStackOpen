import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personServices from './services/personservices'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.findIndex(obj => { return obj.name === newName }) !== -1) {
      if (window.confirm(`${newName} is already added to phonebook, 
          replace the old number with a new one?`)) {
            const updateId = persons.at(persons.findIndex(obj => { return obj.name === newName })).id
            updatePerson(updateId, newNumber)
            setNewName('')
            setNewNumber('')
      }
    } else {
      setPersons(persons.concat(personObject))
      personServices.create(personObject)

    }
    setNotificationMessage(
      `Added '${newName}'`
    )
    setTimeout(() => {
    setNotificationMessage(null)
    }, 5000)

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const updatePerson = (id, updatedNumber) => {
    const newPersons = persons.concat()
    const getIndex = () => newPersons.findIndex(obj => { return obj.id === id })
    const personToUpdate = persons.at(getIndex())
    const updatedPerson = {...personToUpdate, number: updatedNumber}
    personServices.update(id, updatedPerson).catch(error => {
      setErrorMessage(
          `Information of '${updatePerson.id}' has already been removed from server`
      )
    setTimeout(() =>{
      setErrorMessage(null)
    }, 5000)
  })
    newPersons.at(getIndex()).number = updatedNumber
    setPersons(newPersons)
  }

  const deletePerson = (id, name) => {

    const newPersons = persons.concat()
    const getIndex = () => newPersons.findIndex(obj => { return obj.id === id })

    if (window.confirm("Delete " + name + ' ?')) {
      newPersons.splice(getIndex(), 1)
      setPersons(newPersons)
      personServices.remove(id)
    }
  }

  const handleFilterChange = (event) => {
    if (event.target.value.trim().length !== 0) {
      setShowAll(false)
      setFilter(event.target.value)
    } else {
      setShowAll(true)
      setFilter('')
    }
  }

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
      <Notification error={errorMessage}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons remove={deletePerson} personsToShow={personsToShow} />
    </div>
  )

}

export default App