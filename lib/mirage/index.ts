import { createServer, Request } from 'miragejs'

import getConfig, { NodeEnvironment } from 'src/config'

import factories from './factories'
import graphQLHandler from './graphql-handler'
import models from './models'
import seeds from './seeds'

export function makeServer(environment: NodeEnvironment) {
  const { publicRuntimeConfig } = getConfig()

  return createServer({
    environment,
    models,
    factories,
    seeds,

    routes() {
      this.urlPrefix = publicRuntimeConfig.api.graphql

      this.passthrough((request: Request): boolean | void => {
        if (request.url.startsWith('https://getbud-develop.us.auth0.com')) {
          return true
        } // Workaround while https://github.com/miragejs/miragejs/issues/708 is not solved

        if (request.url === '/_next/static/development/_devPagesManifest.json') {
          return true
        } // Workaround while https://github.com/vercel/next.js/issues/16874 is not solved
      })

      const graphQLRouteHandler = graphQLHandler(this.schema)
      this.post('/', graphQLRouteHandler)
    },
  })
}
