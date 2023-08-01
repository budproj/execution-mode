import differenceInDays from 'date-fns/differenceInDays'
import format from 'date-fns/format'
import formatDistance from 'date-fns/formatDistance'
import enUS from 'date-fns/locale/en-US'
import ptBR from 'date-fns/locale/pt-BR'
import { useCookies } from 'react-cookie'
import { useIntl } from 'react-intl'

import { LOCALE_COOKIE_KEY } from 'src/components/Base/LocaleSwitcher/constants'

import messages from './messages'

const userLanguage = new Map([
  ['pt-BR', ptBR],
  ['en-US', enUS],
])

export const useGetLastAccess = (lastAccess?: string) => {
  const intl = useIntl()
  const [{ NEXT_LOCALE: locale }] = useCookies([LOCALE_COOKIE_KEY])

  const sinceDayLastAccess = () => {
    if (lastAccess) {
      const difference = differenceInDays(new Date(`${lastAccess}T00:00`), new Date())
      if (difference === 0) {
        return intl.formatMessage(messages.todayLastAccess)
      }

      const formatedDistance = formatDistance(new Date(`${lastAccess}T00:00`), new Date(), {
        addSuffix: true,
        locale: userLanguage.get(locale.NEXT_LOCALE.value ?? 'pt-BR'),
      })

      return formatedDistance.charAt(0).toUpperCase() + formatedDistance.slice(1)
    }
  }

  const lastAccessSubtext = () => {
    if (lastAccess) {
      const date = new Date(`${lastAccess}T00:00`)
      return format(date, 'dd/MM/yyyy')
    }
  }

  return { sinceDayLastAccess, lastAccessSubtext }
}
