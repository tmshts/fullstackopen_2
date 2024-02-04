import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const returnedData = axios.get(baseUrl).then((response) => response.data)

    return returnedData
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)

    return response.data
}

const updateVotes = async (updatedBlogObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.put(`${baseUrl}/${updatedBlogObject.id}`, updatedBlogObject, config)
    return response.data
}

const deleteBlog = async (blog_id) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${baseUrl}/${blog_id}`, config)
    return response.data
}

export default { getAll, create, setToken, updateVotes, deleteBlog }
