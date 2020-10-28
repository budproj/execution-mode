import { IncomingMessage } from 'http'

export type Locale = 'pt-BR' | 'en-US'

export interface IntlIncomingMessage extends IncomingMessage {
  locale?: Locale
  lang?: string
  nonce?: string
}
