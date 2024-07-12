import { useState, useEffect } from 'react'
import axios from 'axios'

const ListElement = ({ name, onSmash }) => <div>{name} <button onClick={onSmash}>show</button></div>
const App = () => {
  const [countries, setCountries] = useState(null)
  const [result, setResult] = useState([])
  const [country, setCountry] = useState('')

  useEffect(() => {
    if (country) {
      setResult(countries.filter(oneCountry =>
        oneCountry.name.common.toLowerCase().includes(country.toLowerCase())
      ))
    };
  }, 
  [country])
  
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
    }, 
  [])

  const handleChange = (event) => {
    setCountry(event.target.value)
  }
  const showCountry = (result, index) => {
    return (
      <>
        <h1>{result[index].name.common}</h1>
        <p>capital {result[index].capital}<br />area {result[index].area}</p>
        <h3>languages</h3>
        <ul>{Object.values(result[index].languages).map(lang => <li key={lang}>{lang}</li>)}</ul>
        <img src={result[index].flags.svg} style={{ width: "150px", height: "150px"}} />
      </>
    )
  }
  const countriesPrint = (result, country) => {
    if (country) {
      if (result.length >= 10) {
        return <p>Too many matches, specify another filter</p>
      } else if (result.length == 1) {
        return showCountry(result, 0)
      } else {
        return result.map((oneCountry, i) => (
          <ListElement key={oneCountry.cca3} name={oneCountry.name.common} onSmash={() => {console.log(result[i]); setResult([result[i]])}} />
        ))
      }
    }
  }
  return (
    <div>
      find countries <input value={country} onChange={handleChange} />
      {countriesPrint(result,country)}
    </div>
  )
}

export default App