import fetchFromAPI from './fetchFromAPI'

const getFromAPI = async <T>(endpoint: string, component: string): Promise<T> =>
  fetchFromAPI(endpoint, component, { method: 'GET' })

export default getFromAPI
