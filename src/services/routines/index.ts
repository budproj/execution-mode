import axios from 'axios'

const { ROUTINES_API, REST_API_BASE } = process.env

export const routinesInstance = axios.create({
  baseURL: ROUTINES_API ?? `${REST_API_BASE ?? ''}/routines`,
})
