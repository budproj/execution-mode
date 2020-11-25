import { createServer, Server, Request } from 'miragejs'

import { NodeEnvironment } from 'config'

import factories from './factories'
import handlers from './handlers'
import models from './models'

export function makeServer(environment: NodeEnvironment): Server {
  const server = createServer({
    environment,
    models,
    factories,

    seeds(server) {
      server.create('user')
      server.create('cycle')
      server.createList('team', 3)
      server.createList('objective', 3)
      server.createList('confidence', 10)
      server.createList('keyResult', 10)
      server.create('customSorting')
    },

    routes() {
      this.namespace = '/acl'

      this.passthrough((request: Request): boolean | void => {
        if (request.url.startsWith('https://getbud.us.auth0.com')) {
          return true
        } // Workaround while https://github.com/miragejs/miragejs/issues/708 is not solved

        if (request.url === '/_next/static/development/_devPagesManifest.json') {
          return true
        } // Workaround while https://github.com/vercel/next.js/issues/16874 is not solved

        if (request.url === 'http://localhost:8080/graphql') {
          return true
        }
      })

      this.get('/key-results', handlers.keyResults.getAll)
      this.patch('/key-results/:id', handlers.keyResults.patch)

      this.get('/users/:id/custom-sorting/key-results', handlers.users.customSorting.getKeyResults)
      this.patch('/users/:id/custom-sorting', handlers.users.customSorting.patch)
    },
  })

  return server
}
