import { useState } from 'react'

const Person = ({ name, number }) => <p>{ name } { number }</p>
const App = () => {
  /* States */
  const [newPerson, setNewPerson] = useState({
    name:'',
    number: ''
  })
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
  ])

  /* Event handlers */
  const handleNameChange = (event) => {
    setNewPerson({ 
      name: event.target.value,
      number: newPerson.number
    })
  }
  const handleNumberChange = (event) => {
    setNewPerson({ 
      name: newPerson.name,
      number: event.target.value
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
      {persons.map(person => <Person key={person.number} name={person.name} number={person.number} />)}
    </div>
  )
}

export default App