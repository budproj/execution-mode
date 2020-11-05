import { TransformableInfo } from 'logform'
import TransportStream from 'winston-transport'

enum LevelColors {
  DEBUG = 'gray',
  INFO = 'darkturquoise',
  WARN = 'khaki',
  ERROR = 'tomato',
}

type Levels = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'

const defaultColor = 'color: inherit'
const grayColor = 'color: gray'

export class ConsoleTransport extends TransportStream {
  constructor(options = {}) {
    super(options)

    this.setMaxListeners(30)
  }

  log(info: TransformableInfo, next: () => void): void {
    const logLevelColor = `color: ${LevelColors[info.level.toUpperCase() as Levels]};`

    console.log(
      `%c${info.component} %c➤ %c[%c${info.level.toUpperCase()}%c]:`,
      grayColor,
      logLevelColor,
      defaultColor,
      logLevelColor,
      defaultColor,
      info.message,
    )
    info.data && console.log(info.data)

    next()
  }
}
