import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createNew(content))
        dispatch(setNotification(`you added ${content}`))
        setTimeout(() => {
            dispatch(setNotification(null))
          }, 5000)
    }

    return (
        <form onSubmit={createAnecdote}>
            <h2>create new</h2>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm