import logger from 'lib/logger'
import getConfig from 'src/config'

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

  logger.info(`Dispatching ${options.method as string} request to ${absoluteEndpoint}`, {
    component,
  })
  const response: T = await fetch(absoluteEndpoint, options)
    .then(async (response) =>
      response.status > 399 ? handleError(response, component) : response.json(),
    )
    .then((result) => result.data)

  logger.info('Received response:', { data: response, component })

  return response
}

const handleError = async (response: Response, component: string) => {
  const normalizedResponse = {
    statusCode: response.status,
    startText: response.statusText,
    error: await response.json(),
  }

  logger.error('We could not complete your request. Here is the error:', {
    data: normalizedResponse,
    component,
  })

  throw normalizedResponse.error
}

export default fetchFromAPI
