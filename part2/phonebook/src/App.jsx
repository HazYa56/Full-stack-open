
import { useState, useEffect } from 'react'
import { getAll, create, update, omit } from "./modules"

const Notification = ({ message, type }) => {
  const notificationStyle = {
    color: type === 'error' ? "red" : "green",
    background: "lightgrey",
    fontSize: "15px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  }

  if (message === null) {
    return null
  }

  return (
    <div className='error' style={notificationStyle}>
      {message}
    </div>
  )
}
const PersonForm = ({fieldData, onSubmit, onNameChange, onNumberChange}) => {
  return (
    <form onSubmit={onSubmit}  >
      <div>
        name: <input value={fieldData.name} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={fieldData.number} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
const Person = ({ name, number, onSmash  }) => <div>{ name } { number }<button onClick={onSmash}>Delete</button></div>
const Filter = ({ searchValue, onChange }) => { return(<p>filter shown with <input value={searchValue} onChange={onChange} /></p>) }

const App = () => {
  /* States & Effects */
  const [search, setSearch] = useState('')
  const [newPerson, setNewPerson] = useState({
    name:'',
    number: ''
  })
  const [persons, setPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState({ message: null, type: '' })
  useEffect(() => {
    getAll().then(responseData => setPersons(responseData))
  }, [])
  const personsSearched = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  
  /* Event handlers */
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewPerson({
      ...newPerson,
      name: event.target.value,
    })
  }
  const handleNumberChange = (event) => {
    setNewPerson({
      ...newPerson,
      number: event.target.value,
    })
  }
  const handlePersonAdd = (event) => {
    event.preventDefault()
    if (persons.map(person => person.number).includes(newPerson.number)) {
      alert(`${newPerson.number} is already added to phonebook.`);
    } else if (persons.map(person => person.name).includes(newPerson.name)) {
      if (confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one ?`) == true) {
        update(persons.find(person => newPerson.name == person.name).id, newPerson).then(responseData => 
          {setPersons(persons.filter(person => person.name != responseData.name).concat(responseData ));
          setNewPerson({
            name:'',
            number: ''
          });}
        )
      }
    } else {
      create(newPerson).then(responseData => 
        {
          setErrorMessage({ message: `Added ${responseData.name}.`, type: 'success' })
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.concat(responseData));
          setNewPerson({
            name:'',
            number: ''
          })
        }
      )
    }
  }
  const handlePersonDelete = (id) => {
    if (confirm(`Delete ${persons.find(person => person.id == id).name} ?`) == true) {
      omit(id).then(responseData =>
        {
          setPersons(persons.filter(person => person.id != responseData.id));
          setNewPerson({
            name:'',
            number: ''
          })
        }
      ).catch(() => {
        setErrorMessage({
          message: `Information of ${persons.find(person => person.id === id).name} has already been removed from server`,
          type: 'error'
        })
        setTimeout(() => {
          setErrorMessage({ message: null, type: '' })
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={errorMessage.message} type={errorMessage.type} />
      <Filter searchValue={search} onChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm
        fieldData={newPerson}
        onSubmit={handlePersonAdd}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      {personsSearched.map(person => <Person key={person.id} name={person.name} number={person.number} onSmash={() => handlePersonDelete(person.id)} />)}    </>
  )
}

export default App