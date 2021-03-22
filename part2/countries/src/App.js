import axios from 'axios';
import React, {useState, useEffect } from 'react'

const Button = ({ country, setSearch }) => {


  return (
    <button onClick={()=>setSearch(country.name)}>show</button>
  )
}

const Weather = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState([])
  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
  })
  console.log(weather);
  return (

    <div>
      <p>Current Time: {weather.observation_time} </p>
      <p>Current Temperature: {weather.temperature}</p>
      <p>Feels like: {weather.feelslike}</p>
    </div>

  )
}

const ToDisplay = ({filteredCountries, setSearch, setWeather, weather, api_key}) => {

  if (filteredCountries.length === 1) {
    const countryToReturn = filteredCountries[0]
    return (
      <div>
        <h2>{countryToReturn.name}</h2>
        <br />
        <p>capital {countryToReturn.capital}</p>
        <p>population {countryToReturn.population}</p>
        <br />
        <h3>languages</h3>
        <ul>
          {countryToReturn.languages.map(language =>{
            return (
              <li key={language.name}>{language.name}</li>
            )
          })}
        </ul>
        <img src={countryToReturn.flag} alt="country flag" width='300px' height='200px' />
        <Weather country={countryToReturn} />

      </div>
    )
  }
  else if (filteredCountries.length > 10) return 'Too many matches, specify another filter'
  else {
    
    return filteredCountries.map(country => {
      return (
        <div>
          <p key={country.name}>{country.name}<Button country={country} setSearch={setSearch}/></p>
        </div>
        )
    })
  }
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const api_key = process.env.REACT_APP_API_KEY
  const filteredCountries = countries.filter(country => country.name.toLowerCase().startsWith(search.toLowerCase()))
  const countriesToReturn = filteredCountries.length > 10
  ? 'Too many matches, specify another filter'
  : filteredCountries.map(country => <p key={country.name}>{country.name}</p>)
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
