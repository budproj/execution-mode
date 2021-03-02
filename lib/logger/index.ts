import * as winston from 'winston'

import getConfig from 'src/config'

import { ConsoleTransport } from './transports'

const config = getConfig()
const logger = winston.createLogger({
  level: config?.publicRuntimeConfig?.logLevel,
  defaultMeta: { service: 'bud@execution-mode' },
  transports: [
    new ConsoleTransport({
      silent: true,
      level: config?.publicRuntimeConfig?.logLevel,
    }),
  ],
})

if (config?.publicRuntimeConfig?.nodeEnv !== 'production') {
  for (const transport of logger.transports) {
    transport.silent = false
  }
}

export default logger
