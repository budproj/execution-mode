import fetchFromAPI from './fetch-from-api'

const getFromAPI = async <T>(endpoint: string, component: string): Promise<T> =>
  fetchFromAPI(endpoint, component, { method: 'GET' })

export default getFromAPI
