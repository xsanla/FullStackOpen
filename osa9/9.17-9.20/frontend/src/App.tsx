import { useEffect, useState } from 'react'
import { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry, Visibility, Weather} from './types'
import { getAllDiaries, addNewDiary } from './diaryService'
function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])
  const [newDate, setNewDate] = useState("")
  const [newVisibility, setNewVisibility] = useState("")
  const [newWeather, setNewWeather] = useState("")
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newDiary = {
      comment: newComment,
      date: newDate,
      weather: newWeather as Weather,
      visibility: newVisibility as Visibility
    }

    addNewDiary(newDiary).then(data => {
      setDiaries(diaries.concat(data))
    })

    setNewDate("");
    setNewVisibility("");
    setNewWeather("");
    setNewComment("");
  }
  const Entry = (props: NonSensitiveDiaryEntry) => {
    return(
      <div>
        <h3>{props.date}</h3>
        <ul>
          <li>visibility: {props.visibility}</li>
          <li>weather: {props.weather}</li>
        </ul>
      </div>
    )
  }
  return (
  <>
    <div>
      <h3>Add new Entry</h3>
      <form onSubmit={diaryCreation}>
        <label htmlFor="date">Date:</label>
        <input id="date" value={newDate} onChange={(event) => setNewDate(event.target.value)}></input><br></br>
        <label htmlFor="visibility">Visibility:</label>
        <input id="visibility" value={newVisibility} onChange={(event) => setNewVisibility(event.target.value)}></input><br></br>
        <label htmlFor="weather">Weather:</label>
        <input id="weather" value={newWeather} onChange={(event) => setNewWeather(event.target.value)}></input><br></br>
        <label htmlFor="comment">Comment:</label>
        <input id="comment" value={newComment} onChange={(event) => setNewComment(event.target.value)}></input><br></br>
        <button type='submit'>add</button>
      </form>
    </div>
    <div>
      <h1>Diary entries</h1>
      {diaries.map((diaryEntry: NonSensitiveDiaryEntry) => {
        return(
          <Entry {...diaryEntry}></Entry>
        )
      })}
    </div>
  </>
  )
}

export default App
