import { useQuery, gql } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState("all")
  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre: filter
    },
    pollInterval:5000})
  const genres = useQuery(ALL_GENRES, {pollInterval:5000})
  let genreSet = null
  if (!props.show) {
    return null
  }
  if(result.loading){
    return <div>loading...</div>
  }
  if(genres.data){
    genreSet = [...new Set(genres.data.allBooks.flatMap((b) => b.genres))]
  }
  const books = result.data.allBooks
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genreSet && genreSet.map((g) => <button key={g} onClick={()=>setFilter(g)}>{g}</button>)}
      <button key={"all"} onClick={() => setFilter("all")}>all genres</button>
    </div>
  )
}

export default Books
