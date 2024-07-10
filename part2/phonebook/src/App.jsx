import { useState } from 'react'

const Person = ({ name, number }) => <p>{ name } { number }</p>
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
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with <input value={search} onChange={handleSearchChange} /></p>
      <h2>add a new</h2>
      <form onSubmit={handlePersonAdd}  >
        <div>
          name: <input value={newPerson.name} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPerson.number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsSearched.map(person => <Person key={person.id} name={person.name} number={person.number} />)}
    </div>
  )
}

export default App