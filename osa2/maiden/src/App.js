import axios from 'axios'
import { useEffect, useState } from 'react'
import Filter from './components/Filter'

const Weather = (props) => {
  const [weather, setWeather] = useState()
  const [weatherIcon, setWeatherIcon] = useState()

  useEffect(() => {
    const urlEnd = 'lat=' + props.lat + '&lon=' + props.lon + '&appid=' + props.api_key + '&units=metric'
    axios
      .get('https://api.openweathermap.org/data/2.5/weather?' + urlEnd)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  useEffect(() => {
    if (weather != undefined) {
      setWeatherIcon('http://openweathermap.org/img/wn/' + weather.weather.at(0).icon + '@2x.png')
    }
  }, [weather])

  if (weather != undefined) {
    return (
      <div>
        <h2>Weather in {props.capital}</h2>
        <p>temperature {weather.main.temp} Celsius</p>
        <img src={weatherIcon} alt="" />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    )
  }
}

const Countries = (props) => {
  const countriesToShow = props.countries
  const setFilter = props.setFilter
  if (props.show == false && countriesToShow.length < 10 && countriesToShow.length != 1) {
    return (
      <div>
        {countriesToShow.map((country) => {
          return (
            <div>
              {country.name.official}
              <button onClick={() => setFilter(country.name.official)}>show</button>
            </div>
          )
        })}
      </div>
    )
  } else if (countriesToShow.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (countriesToShow.length === 1) {
    const country = countriesToShow.at(0)
    return (
      <div>
        <h1>{country.name.official}</h1>
        <div>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
        </div>
        <h2>languages</h2>
        <div>
          {Object.values(country.languages).map((language) =>
            <p key={language}> {language}</p>
          )}
        </div>
        <div>
          <img src={country.flags.png} alt="" />
        </div>
        <div>
          <Weather lat={country.capitalInfo.latlng.at(0)} lon={country.capitalInfo.latlng.at(1)}
            api_key={props.api_key} capital={country.capital.at(0)} />
        </div>
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [show, setShow] = useState(true)
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all').then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    if (event.target.value.trim().length !== 0) {
      setFilter(event.target.value)
      setShow(false)
    } else {
      setShow(true)
      setFilter("")
    }
  }

  const countriesToShow = show
    ? []
    : countries.filter(country => country.name.official.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries api_key={api_key} show={show} countries={countriesToShow} setFilter={setFilter} />
    </div>
  )
}

export default App;
