import axios from 'axios'

const host = axios.create({
  // withCredentials: true,
  baseURL: 'https://shrouded-reaches-17656.herokuapp.com',
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  // headers: {
  //   'Content-Type': 'application/json',
  //   "Access-Control-Allow-Origin": "*",
  //   'Access-Control-Allow-Credentials': true
  // }
  // baseURL: 'http://localhost:5000/'
})

export { 
  host
}