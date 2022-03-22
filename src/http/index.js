import axios from 'axios'

const host = axios.create({
  withCredentials: true,
  baseURL: 'https://shrouded-reaches-17656.herokuapp.com/',
  headers: {'Content-Type': 'application/json'}
  // baseURL: 'http://localhost:5000/'
})

export { 
  host
}