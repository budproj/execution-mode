import getConfig from 'config'
import logger from 'lib/logger'

type FetchedData = Record<string, unknown> | Record<string, unknown>[] | string[] | number[]

const fetchFromAPI = async (endpoint: string, component: string): Promise<FetchedData> => {
  const { publicRuntimeConfig } = getConfig()
  const apiPath = publicRuntimeConfig.api.acl
  const absoluteEndpoint = [apiPath, endpoint].join('/').replace('//', '/')

  logger.info(`Dispatching get request to ${absoluteEndpoint}...`, { component })
  const response: Promise<FetchedData> = await fetch(absoluteEndpoint)
    .then((res) => res.json())
    .then((result) => result.data)
  logger.info('Received response:', { data: response, component })

  return response
}

export default fetchFromAPI
