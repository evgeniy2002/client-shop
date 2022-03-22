import axios from 'axios'

const host = axios.create({
  baseURL: 'https://shrouded-reaches-17656.herokuapp.com',
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
  // baseURL: 'http://localhost:5000/'
})

export { 
  host
}