export interface HttpsServerConfig {
  key: string
  cert: string
}

export interface ServerConfig {
  port: number
  dev: boolean
  host: string
  https: HttpsServerConfig
  url?: string
}
