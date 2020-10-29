import accepts from 'accepts'
import getConfig from 'next/config'
import crypto from 'crypto'
import { sync as globSync } from 'glob'
import { basename } from 'path'
import { DEFAULT_LOCALE } from './constants'
import { Locale, IntlIncomingMessage } from './types'

const supportedLocales: string[] = globSync('./compiled-lang/*.json').map((file: string) =>
  basename(file, '.json'),
)

export const addIntlToRequest = (req: IntlIncomingMessage): void => {
  const { serverRuntimeConfig } = getConfig()
  const accept = accepts(req)
  const locale: Locale =
    serverRuntimeConfig.localeOverride || accept.language(supportedLocales) || DEFAULT_LOCALE
  const nonce = crypto.randomBytes(20).toString('hex')

  req.locale = locale
  req.lang = locale.split('-')[0]
  req.nonce = nonce
}
