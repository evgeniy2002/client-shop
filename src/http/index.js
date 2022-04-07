import axios from 'axios'

const host = axios.create({
  // withCredentials: true,
  baseURL: 'https://student-store.ru'
  // withCredentials: true,
  // withCredentials: false,
  // credentials: 'same-origin',
  
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Content-Type': 'application/json',
  // }
  // headers: {
  //   'Access-Control-Allow-Origin' : 'https://shrouded-reaches-17656.herokuapp.com/',
  //   'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Credentials': true
  //   }
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