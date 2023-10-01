import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from "react"
import NotificationContext from "./NotificationContext"
const App = () => {
  const queryClient = useQueryClient()
  const updateAnecdote = updatedAnecdote =>
  axios.put(`http://localhost:3001/anecdotes/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)
  const updateAnecdoteMutation = useMutation(updateAnecdote,{
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    },
  })

  const [notification, dispatch] = useContext(NotificationContext)
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes +1})
    dispatch({type:"SET", payload:`anecdote ${anecdote.content} voted`})
    setTimeout( () => {
      dispatch({type:"CLEAR"})
    }, 5000)
    console.log('vote')
  }
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data),
    retry: false
  })
  if (result.isError) {
    return (
      <div>
        anecdote service not availible due to problems in server
      </div>
    )
  }
  if (result.isSuccess) {
    const anecdotes = result.data
    return (
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App
