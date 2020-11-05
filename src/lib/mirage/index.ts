import faker from 'faker'
import { createServer, Factory, Model, Server } from 'miragejs'

import { KeyResult } from 'components/KeyResult'
import { NodeEnv } from 'config'

export function makeServer(environment: NodeEnv, maxEntries = 50): Server {
  const server = createServer({
    environment,

    models: {
      keyResult: Model,
    },

    factories: {
      keyResult: Factory.extend({
        title: faker.name.title(),
        team: faker.random.words(),
        confidence: faker.random.number(100),
        progress: faker.random.number(100),
        date: {
          start: faker.date.past(),
          end: faker.date.future(),
        },
        icon: {
          drawing: faker.random.word(),
          backgroundColor: faker.random.hexaDecimal(),
        },
        objective: {
          id: faker.random.uuid(),
          title: faker.name.title(),
        },
        owner: {
          id: faker.random.uuid(),
          name: faker.name.findName(),
          role: faker.name.jobTitle(),
        },
      } as KeyResult),
    },

    seeds(server) {
      server.createList('keyResult', faker.random.number(maxEntries))
    },

    routes() {
      this.namespace = 'api'

      this.get('/key-results', (schema) => schema.keyResults.all())
    },
  })

  return server
}
