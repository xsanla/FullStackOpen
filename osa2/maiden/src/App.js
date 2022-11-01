import axios from 'axios'
import { useEffect, useState } from 'react'
import Filter from './components/Filter'

const Countries = (props) => {
  const countriesToShow = props.countries
  if (props.show == false && countriesToShow.length < 10 && countriesToShow.length !=1) {
    return (
      <div>
        {countriesToShow.map((country) =>
          <p key={country.name.official}>{country.name.official}</p>
        )}
      </div>
    )
  } else if (countriesToShow.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if(countriesToShow.length === 1) {
    const country = countriesToShow.at(0)
    console.log("yks country jäljel")
    console.log(country)
    return (
      <div>
        <h1>{country.name.official}</h1>
        <div>
          capital {country.capital}
          area {country.area}
        </div>
        <h2>languages</h2>
        <div>
          {country.languages.map((language) =>
            <p key={language}>{language}</p>
          )}
        </div>
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [show, setShow] = useState(true)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all').then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    if (event.target.value.trim().length !== 0) {
      setFilter(event.target.value)
      setShow(false)
      console.log("mitä vittua")
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
      <Countries show={show} countries={countriesToShow} />
    </div>
  )
}

export default App;
