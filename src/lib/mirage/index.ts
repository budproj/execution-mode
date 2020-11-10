import { createServer, Server } from 'miragejs'

import { NodeEnv } from 'config'

import factories from './factories'
import handlers from './handlers'
import models from './models'

export function makeServer(environment: NodeEnv): Server {
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
      this.namespace = 'api'

      this.passthrough((request) => {
        if (request.url === '/_next/static/development/_devPagesManifest.json') {
          return true
        }
      })
      /* Temporary fix while https://github.com/vercel/next.js/issues/16874 is not solved */

      this.get('/key-results', handlers.keyResults.getAll)
      this.patch('/key-results/:id', handlers.keyResults.patch)
      this.patch('/users/:id/custom-sorting', handlers.users.customSorting.patch)
      this.get('/users/:id/custom-sorting/key-results', handlers.users.customSorting.getKeyResults)
    },
  })

  return server
}
