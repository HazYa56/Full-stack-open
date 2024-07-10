import { useState } from 'react'

const Person = ({ name }) => <p>{ name }</p>
const App = () => {
  const [newName, setNewName] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Ada Loverace' },
  ]) 

  const handleNameAdd = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName }));
      setNewName('');
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNameAdd}  >
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} name={person.name} />)}
    </div>
  )
}

export default App