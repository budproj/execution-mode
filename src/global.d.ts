import { Locale } from 'server/intl/types'

declare global {
  interface Window {
    LOCALE: Locale
  }
}
