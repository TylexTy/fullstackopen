import {useState, useEffect} from 'react'
import axios from 'axios'

const Button = ({ country, setSearch, key }) => {


    return (
      <button onClick={()=>setSearch(country.name)}>show</button>
    )
  }
  
  const Weather = ({location}) => { 
    const [weather, setWeather] = useState([])
    const [load, setLoad] = useState(true)
    useEffect(() => {
      const api_key = process.env.REACT_APP_API_KEY
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`)
        .then(response => {
          const weatherData = response.data
          setWeather(weatherData)
          setLoad(false)
        })
    }, [location])
    console.log(weather)
  
    if (load) return <p>fetching data!</p>
    return (
      <div>
        <p>temperature: {weather.main.temp} Celsius</p>
        <p>Feels like: {weather.main.feels_like} Celsius</p>
        <p>Weather: {weather.weather[0].description}</p>
      </div>
  
    )
  }
  
  const ToDisplay = ({filteredCountries, setSearch}) => {
  
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
          <Weather location={countryToReturn.capital} />
  
        </div>
      )
    }
    else if (filteredCountries.length > 10) return 'Too many matches, specify another filter'
    else {
      
      return filteredCountries.map(country => {
        return (
            <p key={country.name}>{country.name}<Button country={country} setSearch={setSearch}/></p>
          )
      })
    }
  }

export default ToDisplay