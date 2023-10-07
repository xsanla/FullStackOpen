import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async (blogData) => {
  const config = {
    headers:{Authorization: token}
  }
  const response = await axios.post(baseUrl, blogData, config)
  return response.data
}

const update = async (id) => {
  const blogUrl = baseUrl +'/'+ id
  const blogData = await axios.get(blogUrl)
  const toUpdate = {
    ...blogData.data,
    likes: blogData.data.likes +1
  }
  const response = await axios.put(blogUrl, toUpdate)
  return response.data
}

const deleteBlog = async (id) =>{
  const blogUrl = baseUrl + '/' + id
  const config = {
    headers:{Authorization: token}
  }
  const response = await axios.delete(blogUrl, config)
  return response.data
}
export default { getAll, createNew, update, deleteBlog, setToken }