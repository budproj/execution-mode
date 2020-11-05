import { createServer, Server } from 'miragejs'

import factories from './factories'
import models from './models'
import serializers from './serializers'

import { NodeEnv } from 'config'

export function makeServer(environment: NodeEnv): Server {
  const server = createServer({
    environment,
    models,
    factories,
    serializers,

    seeds(server) {
      server.create('user')
      server.create('cycle')
      server.createList('icon', 10)
      server.createList('objective', 3)
      server.createList('keyResult', 10)
    },

    routes() {
      this.namespace = 'api'

      this.get('/key-results', (schema) => schema.keyResults.all())
    },
  })

  return server
}
