import { useEffect, useState } from 'react'
import { NonSensitiveDiaryEntry, ErrorMessage, Visibility, Weather} from './types'
import { getAllDiaries, addNewDiary } from './diaryService'
import axios from 'axios';
function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])
  const [newDate, setNewDate] = useState("")
  const [newVisibility, setNewVisibility] = useState("")
  const [newWeather, setNewWeather] = useState("")
  const [newComment, setNewComment] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
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
      setDiaries(diaries.concat(data)
    )
    }).catch((error) => {
      if(axios.isAxiosError(error)) {
        if(error.response){
          setErrorMessage(error.response.data)
        }
      } else {
        console.log(error.response)
      }
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

const ErrorParagraph = (props: ErrorMessage) => {
  if(props.message !== "") {
    return (
      <p style={{color: 'red'}}>{props.message}</p>
    )
  } else {
    return null
  }
}

const emptyError = () => {
  setErrorMessage("")
}
  
  return (
  <>
    <div>
      <h3>Add new Entry</h3>
      <ErrorParagraph message={errorMessage}></ErrorParagraph>
      <form onSubmit={diaryCreation}>
        <label htmlFor="date">Date:</label>
        <input id="date" value={newDate} onChange={(event) => setNewDate(event.target.value)}></input><br></br>
        <label htmlFor="visibility">Visibility:</label>
        <input id="visibility" value={newVisibility} onChange={(event) => setNewVisibility(event.target.value)}></input><br></br>
        <label htmlFor="weather">Weather:</label>
        <input id="weather" value={newWeather} onChange={(event) => setNewWeather(event.target.value)}></input><br></br>
        <label htmlFor="comment">Comment:</label>
        <input id="comment" value={newComment} onChange={(event) => setNewComment(event.target.value)}></input><br></br>
        <button type='submit' onClick={emptyError}>add</button>
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
