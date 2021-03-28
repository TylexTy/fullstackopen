import axios from 'axios';
import React, {useState, useEffect } from 'react'
import ToDisplay from './ToDisplay'

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const filteredCountries = countries.filter(country => country.name.toLowerCase().startsWith(search.toLowerCase()))

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  
  return (
    <div>
      <p>find countries<input value={search} onChange={handleSearch}/></p>
      <ToDisplay filteredCountries={filteredCountries} setSearch={setSearch} />
    </div>
  )

}


export default App;
