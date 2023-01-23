import differenceInDays from 'date-fns/differenceInDays'
import format from 'date-fns/format'
import formatDistance from 'date-fns/formatDistance'
import ptBR from 'date-fns/locale/pt-BR'
import { useIntl } from 'react-intl'

import { User } from '../../types'
import { useGetUserDetails } from '../getUserDetails'

import messages from './messages'

export const useGetLastAccess = (userId: User['id']) => {
  const intl = useIntl()

  const { data: user, loading } = useGetUserDetails(userId)
  const userLastAccessDate = user?.amplitude?.last_used ?? ''

  const sinceDayLastAccess = () => {
    if (userLastAccessDate) {
      const difference = differenceInDays(new Date(`${userLastAccessDate}T00:00`), new Date())
      if (difference === 0) {
        return intl.formatMessage(messages.todayLastAccess)
      }

      const formatedDistance = formatDistance(new Date(`${userLastAccessDate}T00:00`), new Date(), {
        addSuffix: true,
        locale: ptBR,
      })

      return formatedDistance.charAt(0).toUpperCase() + formatedDistance.slice(1)
    }
  }

  const lastAccessSubtext = () => {
    if (userLastAccessDate) {
      const date = new Date(`${userLastAccessDate}T00:00`)
      return format(date, 'dd/MM/yyyy')
    }
  }

  return { userLastAccessDate, sinceDayLastAccess, lastAccessSubtext, loading }
}
