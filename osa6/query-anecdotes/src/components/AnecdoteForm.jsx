import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: (newAnecdote) => axios.post('http://localhost:3001/anecdotes', newAnecdote).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      console.log(error)
      dispatch({ type: "SET", payload: `too short anecdote, must have length 5 or more` })
      setTimeout(() => {
        dispatch({ type: "CLEAR" })
      }, 5000)
    }
  })
  const [notification, dispatch] = useContext(NotificationContext)
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({ type: "SET", payload: `anecdote ${content} added` })
    setTimeout(() => {
      dispatch({ type: "CLEAR" })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
