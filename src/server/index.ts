import Koa from 'koa'
import Router from '@koa/router'
import next from 'next'
import { cyan, gray } from 'chalk'

import config from './config'
import { addIntlToRequest } from './intl'

const launch = (): void => {
  const app = next({
    dev: config.dev,
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

    server.use(async (ctx, next) => {
      addIntlToRequest(ctx.req)
      await next()
    })

    server.use(router.routes())

    server.listen(config.port, () =>
      log(`${cyan('➤')} ${gray('Web server running on:')} ${config.host}:${config.port}`),
    )
  })
}

export default {
  launch,
}
