import { createServer, Server } from 'miragejs'

import factories from './factories'
import handlers from './handlers'
import models from './models'

import { NodeEnv } from 'config'

export function makeServer(environment: NodeEnv): Server {
  const server = createServer({
    environment,
    models,
    factories,

    seeds(server) {
      server.create('user')
      server.create('cycle')
      server.createList('team', 3)
      server.createList('icon', 10)
      server.createList('objective', 3)
      server.createList('keyResult', 10)
      server.create('customSorting')
    },

    routes() {
      this.namespace = 'api'

      this.get('/key-results', handlers.keyResults)
      this.get('/users/:id/custom-sorting/key-results', handlers.userCustomSortingKeyResults)
    },
  })

  return server
}
