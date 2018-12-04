import axios from 'axios'

export const baseURL = 'http://localhost:3000/app'
export const Axios = axios.create({
  baseURL
})
