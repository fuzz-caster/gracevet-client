import axios from 'axios'

export const baseURL = 'http://localhost/app'
export const Axios = axios.create({
  baseURL
})
