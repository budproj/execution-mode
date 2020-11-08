import fetchFromAPI from './fetch-from-api'

const patchFromAPI = async <T>(
  endpoint: string,
  body: Record<string, unknown>,
  component: string,
): Promise<T> => fetchFromAPI(endpoint, component, { method: 'PATCH', body: JSON.stringify(body) })

export default patchFromAPI
