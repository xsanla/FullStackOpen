import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  const handleClickNext = () =>{
    const index = getRandomInt(anecdotes.length)
    setSelected(index)
  }

  const mostVoted = () =>{
    const max = Math.max(...votes)
    return votes.indexOf(max)
  }

  const handleClickVote = () =>{
    const copy = [...votes]  
    // kasvatetaan taulukon paikan 2 arvoa yhdellä
    copy[selected] += 1 
    setVotes(copy)     
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        has {votes[selected]} votes
      </div>
      <div>
        <Button handleClick={handleClickVote} text="vote"/>
        <Button handleClick={handleClickNext} text="next anecdote"/>
      </div>
      <h1>Anecdote with the most votes</h1>
      <div>
        {anecdotes[mostVoted()]}
      </div>
      <div>
        has {votes[mostVoted()]} votes
      </div>
    </>
  )
}

export default App