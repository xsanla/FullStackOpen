import { useSelector, useDispatch } from 'react-redux'
import { voteAsync } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => {
        return ([...state.anecdotes].sort((a, b) => {
            return b.votes - a.votes
        })).filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })

    const dispatch = useDispatch()

    const voteAction = (id, content) => {
        console.log('vote', id)
        dispatch(voteAsync(id))
        dispatch(setNotification(`you voted ${content}`,5))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteAction(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList