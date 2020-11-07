import getConfig from 'config'
import logger from 'lib/logger'

const defaultOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}

const fetchFromAPI = async <T extends Response>(
  endpoint: string,
  component: string,
  options: RequestInit = defaultOptions,
): Promise<T> => {
  const { publicRuntimeConfig } = getConfig()
  const apiPath = publicRuntimeConfig.api.acl
  const absoluteEndpoint = [apiPath, endpoint].join('/').replace('//', '/')

  logger.info(`Dispatching ${options.method} request to ${absoluteEndpoint}`, { component })
  const response: T = await fetch(absoluteEndpoint, options)
    .then((res) => (res.status > 399 ? handleError(res, component) : res.json()))
    .then((result) => result.data)

  logger.info('Received response:', { data: response, component })

  return response
}

const handleError = async (res: Response, component: string) => {
  const response = {
    statusCode: res.status,
    startText: res.statusText,
    error: await res.json(),
  }

  logger.error('We could not complete your request. Here is the error:', {
    data: response,
    component,
  })

  throw response.error
}

export default fetchFromAPI
