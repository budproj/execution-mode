import { createGraphQLHandler, Request } from '@miragejs/graphql'
import { createServer } from 'miragejs'

import getConfig, { NodeEnvironment } from 'config'

import factories from './factories'
import models from './models'
import schema from './schema.gql'

export function makeServer(environment: NodeEnvironment) {
  const { publicRuntimeConfig } = getConfig()

  return createServer({
    environment,
    models,
    factories,

    seeds(server) {
      server.create('company')
      server.createList('team', 3)
      server.create('user')
      server.create('cycle')
      server.createList('objective', 3)
      server.createList('keyResult', 10)
      server.createList('confidenceReport', 10)
      server.createList('progressReport', 10)
      server.create('keyResultView')
    },

    routes() {
      this.urlPrefix = publicRuntimeConfig.api.graphql

      this.passthrough((request: Request): boolean | void => {
        if (request.url === '/_next/static/development/_devPagesManifest.json') {
          return true
        } // Workaround while https://github.com/vercel/next.js/issues/16874 is not solved
      })

      const graphQLHandler = createGraphQLHandler(schema, this.schema)
      this.post('/', graphQLHandler)
    },
  })
}
