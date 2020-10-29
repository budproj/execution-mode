import { IncomingMessage } from 'http'
import { MessageDescriptor } from 'react-intl'

export type Locale = 'pt-BR' | 'en-US'

export interface IntlIncomingMessage extends IncomingMessage {
  locale?: Locale
  lang?: string
  nonce?: string
}

export type IntlMessages = Record<string, MessageDescriptor>
