import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createNew(state, action){
      const content = action.payload 
      state.push(content)
    },
    vote(state, action){
      const id = action.payload
      const toChange = state.find(n => n.id === id)
      const changed = {
        ...toChange,
        votes: toChange.votes + 1
      }
      return state.map(a =>
        a.id !== id ? a : changed
      )
    },
    setAnecdotes(state, action){
      return action.payload
    }
  },
})
export const {createNew, vote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer