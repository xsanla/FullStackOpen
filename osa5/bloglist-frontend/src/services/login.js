import axios from 'axios'
const basurl = 'http://localhost:3003/api/login'

const login = async credentials =>{
    const response = await axios.post(basurl, credentials)
    return response.data
}

export default {login}