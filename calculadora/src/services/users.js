import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const getAll = async () => {
  return await axios.get(baseUrl)
}

const create = async (newObject) => {
  return await axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}