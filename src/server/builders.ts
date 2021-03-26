import fs from 'fs'
import http, { Server as HttpServer } from 'http'
import https, { Server as HttpsServer } from 'https'

import Router from '@koa/router'
import chalk from 'chalk'
import Koa from 'koa'
import localtunnel from 'localtunnel'

import config from './config'

export const buildServer = async (app: Record<string, any>): Promise<void> => {
  const koaServer = buildKoaServer(app)
  const server = buildHttpOrHttpsServer(koaServer)

  const tunnel = config.isCodespace && (await localtunnel({ port: config.port }))
  const endpoint = tunnel
    ? tunnel.url
    : config.url?.toString() ??
      `https://${config.host}${config.dev ? `:${config.port.toString()}` : ''}`

  server.listen(config.port, () => {
    console.log(`${chalk.cyan('➤')} ${chalk.gray('Web server running on:')} ${endpoint}`)
  })
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

const buildHttpOrHttpsServer = (koaServer: Koa): HttpsServer | HttpServer => {
  const isHttps = fs.existsSync(config.https.key) && fs.existsSync(config.https.cert)
  const server = isHttps ? buildHttpsServer(koaServer) : buildHttpServer(koaServer)

  return server
}

const buildHttpsServer = (koaServer: Koa): HttpsServer => {
  const options = {
    key: fs.readFileSync(config.https.key, 'utf8').toString(),
    cert: fs.readFileSync(config.https.cert, 'utf8').toString(),
  }

  const server = https.createServer(options, koaServer.callback())

  return server
}

const buildHttpServer = (koaServer: Koa): HttpServer => {
  const server = http.createServer(koaServer.callback())

  return server
}
