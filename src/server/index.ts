import fs from 'fs'
import https, { Server } from 'https'

import Router from '@koa/router'
import chalk from 'chalk'
import Koa from 'koa'
import next from 'next'

import config from './config'

const launch = async (): Promise<void> => {
  const app = next({
    dev: config.dev,
    dir: './src',
  })

  await app.prepare()

  return buildServer(app)
}

const buildServer = (app: Record<string, any>): void => {
  const koaServer = buildKoaServer(app)
  const httpsServer = buildHttpsServer(koaServer)

  httpsServer.listen(config.port, () =>
    console.log(
      `${chalk.cyan('➤')} ${chalk.gray('Web server running on:')} https://${config.host}:${
        config.port
      }`,
    ),
  )
}

const buildKoaServer = (app: Record<string, any>): Koa => {
  const server = new Koa()
  const router = new Router()
  const handle = app.getRequestHandler()

  server.use(async (context, next) => {
    context.res.statusCode = 200
    await next()
  })

  router.all('(.*)', async (context) => {
    await handle(context.req, context.res)
    context.respond = false
  })

  server.use(router.routes())

  return server
}

const buildHttpsServer = (koaServer: Koa): Server => {
  const options = {
    key: fs.readFileSync(config.https.key, 'utf8').toString(),
    cert: fs.readFileSync(config.https.cert, 'utf8').toString(),
  }

  const server = https.createServer(options, koaServer.callback())

  return server
}

const server = { launch }

export default server
