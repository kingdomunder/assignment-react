import axios from 'axios'
import { ACCESS_TOKEN, SERVER_URL } from '../constants'

const API = axios.create({
    baseURL: 'http://jssampletest.herokuapp.com/',
    // baseURL: SERVER_URL,
  })

export default API