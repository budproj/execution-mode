import getConfig from 'config'
import logger from 'lib/logger'

const defaultOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}

const fetchFromAPI = async <T>(
  endpoint: string,
  component: string,
  options: RequestInit = defaultOptions,
): Promise<T> => {
  const { publicRuntimeConfig } = getConfig()
  const apiPath = publicRuntimeConfig.api.acl
  const absoluteEndpoint = [apiPath, endpoint].join('/').replace('//', '/')

  logger.info(`Dispatching ${options.method} request to ${absoluteEndpoint}`, { component })
  const response: Promise<T> = await fetch(absoluteEndpoint, options)
    .then((res) => res.json())
    .then((result) => result.data)
  logger.info('Received response:', { data: response, component })

  return response
}

export default fetchFromAPI
