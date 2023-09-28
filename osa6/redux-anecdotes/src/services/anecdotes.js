import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = {
        content: content,
        votes: 0
    }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const voteBackend = async (id) => {
    let response = await axios.get(baseUrl + `/${id}`)
    const toUpdate = response.data
    toUpdate.votes = toUpdate.votes +1
    response = await axios.put(baseUrl + `/${id}`, toUpdate)
    return response.data
}

export default {
    getAll,
    createNew,
    voteBackend
}