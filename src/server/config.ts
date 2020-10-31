import { ServerConfig } from './types'

const { PORT, APP_ENV, HOST, ENABLE_HTTPS } = process.env

const config: ServerConfig = {
  port: PORT || '3000',
  dev: APP_ENV !== 'production',
  host: HOST || 'local.getbud.co',
  secure: ENABLE_HTTPS === 'true',
}

export default config
