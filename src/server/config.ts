import { ServerConfig } from './types'

const { PORT, NODE_ENV, HOST, URL, HTTPS_KEY, HTTPS_CERT } = process.env

const config: ServerConfig = {
  port: PORT ?? '3000',
  dev: NODE_ENV !== 'production',
  host: HOST ?? 'local.getbud.co',
  url: URL,
  https: {
    key: HTTPS_KEY ?? 'key.key',
    cert: HTTPS_CERT ?? 'cert.cert',
  },
}

export default config
