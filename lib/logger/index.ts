import * as winston from 'winston'

import getConfig from 'src/config'

import { ConsoleTransport } from './transports'

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
