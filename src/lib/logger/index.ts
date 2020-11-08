import * as winston from 'winston'

import { ConsoleTransport } from './transports'

import getConfig from 'config'

const { publicRuntimeConfig } = getConfig()
const logger = winston.createLogger({
  level: publicRuntimeConfig.logLevel,
  defaultMeta: { service: 'bud@execution-mode' },
  transports: [
    new ConsoleTransport({
      silent: true,
      level: publicRuntimeConfig.logLevel,
    }),
  ],
})

if (publicRuntimeConfig.nodeEnv !== 'production') {
  logger.transports.forEach((transport): void => {
    transport.silent = false
  })
}

export default logger
