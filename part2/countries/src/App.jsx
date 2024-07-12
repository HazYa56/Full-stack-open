import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [country, setCountry] = useState('')

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
  const countriesPrint = (country) => {
    if (country) {
      const result = countries.filter(oneCountry =>
        oneCountry.name.common.toLowerCase().includes(country.toLowerCase())
      )
      if (result.length >= 10) {
        return <p>Too many matches, specify another filter</p>
      } else if (result.length == 1) {
        return (
          <>
            <h1>{result[0].name.common}</h1>
            <p>capital {result[0].capital}<br />area {result[0].area}</p>
            <h3>languages</h3>
            <ul>{Object.values(result[0].languages).map(lang => <li key={lang}>{lang}</li>)}</ul>
            <img src={result[0].flags.svg} style={{ width: "150px", height: "150px"}} />
          </>
        )
      } else {
        return result.map((oneCountry) => (
          <div key={oneCountry.name.common}>{oneCountry.name.common}</div>
        ))
      }
    }
  }
  return (
    <div>
      find countries <input value={country} onChange={handleChange} />
      {countriesPrint(country)}
    </div>
  )
}

export default App