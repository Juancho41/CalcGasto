import axios from "axios";
const baseUrl = "http://localhost:3001/api/ingresos";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const create = async (newObject) => {
  console.log(newObject)
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteIngreso = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};


export default { getAll, create, update, setToken, deleteIngreso };
