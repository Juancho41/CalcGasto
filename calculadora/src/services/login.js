import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'


const login = async (newObject) => {
  return await axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { 
  login: login, 
  update: update 
}