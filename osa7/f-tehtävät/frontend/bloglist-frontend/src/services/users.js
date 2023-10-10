import axios from 'axios'
const baseurl = 'http://localhost:3003/api/users'

const getAll= async () =>{
    const response = await axios.get(baseurl)
    return response.data
}

const get =async(id) =>{
    const response = await axios.get(baseurl + "/" + id)
    return response.data
}

export default {getAll, get}