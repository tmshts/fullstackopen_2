import axios from 'axios'
const baseUrl = '/api/users'


const getAll = () => {
    const returnedData = axios.get(baseUrl).then((response) => response.data)

    return returnedData
}

export default { getAll }
