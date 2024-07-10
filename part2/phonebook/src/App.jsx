import { useState } from 'react'

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
const Person = ({ name, number }) => <p>{ name } { number }</p>
const Persons = ({ personList }) => { return(personList.map(person => <Person key={person.id} name={person.name} number={person.number} />)) }
const Filter = ({ searchValue, onChange }) => { return(<p>filter shown with <input value={searchValue} onChange={onChange} /></p>) }

const App = () => {
  /* States */
  const [search, setSearch] = useState('')
  const [newPerson, setNewPerson] = useState({
    name:'',
    number: ''
  })
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 56329 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 23454 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 85693 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 89862 }
  ])
  const personsSearched = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  /* Event handlers */
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewPerson({ 
      name: event.target.value,
      number: newPerson.number,
      id: Math.round(Math.random()*1e5)
    })
  }
  const handleNumberChange = (event) => {
    setNewPerson({ 
      name: newPerson.name,
      number: event.target.value,
      id: Math.round(Math.random()*1e5)
    })
  }
  const handlePersonAdd = (event) => {
    event.preventDefault()
    if (persons.map(person => person.number).includes(newPerson.number)) {
      alert(`${newPerson.number} is already added to phonebook.`);
    } else if (persons.map(person => person.name).includes(newPerson.name)) {
      if (confirm(`Do you want to update ${newPerson.name} number ?`) == true) {
        setPersons(persons.filter(person => person.name != newPerson.name).concat(newPerson));
        setNewPerson({
          name:'',
          number: ''
        });
      }
    } else {
      setPersons(persons.concat(newPerson));
      setNewPerson({
        name:'',
        number: ''
      });
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter searchValue={search} onChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm
        fieldData={newPerson}
        onSubmit={handlePersonAdd}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons personList={personsSearched} />
    </>
  )
}

export default App