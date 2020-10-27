const {
  PORT,
  NODE_ENV,
  HOST,
} = process.env

type ServerConfig = {
  port: string,
  dev: boolean,
  host: string,
}

const config: ServerConfig = {
  port: PORT || '3000',
  dev: NODE_ENV !== 'production',
  host: HOST || 'http://local.getbud.co',
}

export default config
