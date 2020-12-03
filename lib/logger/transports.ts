import format from 'date-fns/format'
import { TransformableInfo } from 'logform'
import TransportStream from 'winston-transport'

import { LogLevel } from 'src/config'

enum LogLevelColors {
  DEBUG = 'gray',
  INFO = 'darkturquoise',
  WARN = 'khaki',
  ERROR = 'tomato',
}

const defaultColor = 'color: inherit'
const grayColor = 'color: gray'

export type LogFunctionHashmap = Record<LogLevel, typeof console.log>

export class ConsoleTransport extends TransportStream {
  constructor(options = {}) {
    super(options)

    this.setMaxListeners(30)
  }

  log(info: TransformableInfo, next: () => void): void {
    const logLevelColor = `color: ${LogLevelColors[info.level.toUpperCase() as LogLevel]};`
    const timestamp = new Date()
    const formattedDate = format(timestamp, 'yyyy-MM-dd hh:mm:ss:SS')
    const logFunctionHashmap: LogFunctionHashmap = {
      DEBUG: console.debug,
      INFO: console.info,
      WARN: console.warn,
      ERROR: console.error,
    }
    const log = logFunctionHashmap[info.level.toString() as LogLevel] ?? console.log

    log(
      `%c${formattedDate} - ${info.component as string} %c➤ %c[%c${info.level.toUpperCase()}%c]:`,
      grayColor,
      logLevelColor,
      defaultColor,
      logLevelColor,
      defaultColor,
      info.message,
    )
    if (info.data) log(info.data)

    next()
  }
}
