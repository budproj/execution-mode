import * as winston from 'winston'

import { ConsoleTransport } from './transports'

import getConfig from 'config'

const LOGLEVEL = 'debug'

const { publicRuntimeConfig } = getConfig()
const logger = winston.createLogger({
  level: LOGLEVEL,
  defaultMeta: { service: 'bud@execution-mode' },
  transports: [
    new ConsoleTransport({
      silent: true,
      level: LOGLEVEL,
    }),
  ],
})

if (publicRuntimeConfig.nodeEnv !== 'production') {
  logger.transports.forEach((transport) => (transport.silent = false))
}

export default logger
