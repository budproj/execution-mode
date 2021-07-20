import { Server } from 'miragejs'

import getConfig from 'src/config'

import { graphQLHandler } from './graphql/handler'
import { passthroughUrls } from './passthrough-urls'

const { publicRuntimeConfig } = getConfig()

export const routes = (mirage: Server): void => {
  mirage.urlPrefix = publicRuntimeConfig.api.graphql

  mirage.passthrough(passthroughUrls)

  const graphQLRouteHandler = graphQLHandler(mirage.schema)
  mirage.post('/', graphQLRouteHandler)
}
