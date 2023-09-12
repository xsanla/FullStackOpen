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

const update = async (blogData) => {
  const id = blogData._id
  const blogUrl = baseUrl +'/'+ id
  const response = await axios.put(blogUrl, blogData)
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