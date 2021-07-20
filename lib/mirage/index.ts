import { createServer } from 'miragejs'

import { NodeEnvironment } from 'src/config'

import { factories } from './factories'
import { models } from './models'
import { routes } from './routes'
import { seeds } from './seeds'

export const makeServer = (environment: NodeEnvironment) =>
  createServer({
    environment,
    models,
    factories,
    seeds,
    routes() {
      routes(this)
    },
  })
