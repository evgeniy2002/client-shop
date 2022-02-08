import axios from 'axios'

const host = axios.create({
  baseURL: 'https://shrouded-reaches-17656.herokuapp.com/'
})

export { 
  host
}