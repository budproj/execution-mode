import next from 'next'

import { buildServer } from './builders'
import config from './config'

const launch = async (): Promise<void> => {
  const app = next({
    dev: config.dev,
  })

  await app.prepare()

  return buildServer(app)
}

launch()
