export interface HttpsServerConfig {
  key: string
  cert: string
}

export interface ServerConfig {
  port: string
  dev: boolean
  host: string
  https: HttpsServerConfig
}
