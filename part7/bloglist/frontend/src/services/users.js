import axios from 'axios'
const baseUrl = '/api/users'


const getAll = () => {
    const returnedData = axios.get(baseUrl).then((response) => response.data)

    return returnedData
}

const getUser = async (user_id) => {
    const response = await axios.get(`${baseUrl}/${user_id}`)
    console.log("getUser")
    console.log(response.data)
    return response.data   
}

export default { getAll, getUser }