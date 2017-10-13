import axios from 'axios'

export const api = axios.create({
  baseURL: window.location.protocol + '//' + window.location.hostname + ':' + 3002 + '/api/',
  port:3002,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: process.env.REACT_APP_API_TOKEN
  }
})

export default api
