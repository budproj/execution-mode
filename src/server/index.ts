import Router from '@koa/router'
import { cyan, gray } from 'chalk'
import Koa from 'koa'
import next from 'next'

import config from './config'

const launch = (): void => {
  const app = next({
    dev: config.dev,
    dir: './src',
  })

  app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()
    const log = console.log
    const handle = app.getRequestHandler()

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })

    router.all('(.*)', async (ctx) => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })

    server.use(router.routes())

    server.listen(config.port, () =>
      log(
        `${cyan('➤')} ${gray('Web server running on:')} ${config.secure ? 'https' : 'http'}://${
          config.host
        }:${config.port}`,
      ),
    )
  })
}

export default {
  launch,
}
