import { ServerConfig } from './types'

const { PORT, APP_ENV, HOST, HTTPS_KEY, HTTPS_CERT } = process.env

const config: ServerConfig = {
  port: PORT ?? '3000',
  dev: APP_ENV !== 'production',
  host: HOST ?? 'local.getbud.co',
  https: {
    key: HTTPS_KEY ?? 'key.key',
    cert: HTTPS_CERT ?? 'cert.cert',
  },
}

export default config
