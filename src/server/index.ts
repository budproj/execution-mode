import Koa from 'koa'
import Router from '@koa/router'
import next from 'next'
import { cyan, gray } from 'chalk'

import config from './config'

const launch = (): void => {
  const app = next({
    dev: config.dev,
  })

  app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()
    const log = console.log

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })

    server.use(router.routes())

    server.listen(config.port, () => (
      log(`${cyan('➤')} ${gray('Web server running on:')} ${config.host}:${config.port}`)
    ))
  })
}

export default {
  launch,
}
