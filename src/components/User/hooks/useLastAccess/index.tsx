import { useQuery } from '@apollo/client'
import differenceInDays from 'date-fns/differenceInDays'
import format from 'date-fns/format'
import formatDistance from 'date-fns/formatDistance'
import enUS from 'date-fns/locale/en-US'
import ptBR from 'date-fns/locale/pt-BR'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import queries from 'src/components/User/Create/Form/queries.gql'

import { User } from '../../types'
import { useGetUserDetails } from '../getUserDetails'

import messages from './messages'

const userLanguage = new Map([
  ['pt-BR', ptBR],
  ['en-US', enUS],
])

export const useGetLastAccess = (userId: User['id']) => {
  const intl = useIntl()
  const [userLocale, setUserLocale] = useState(userLanguage.get('pt-BR'))

  const { loading: isGetUserLocaleLoading } = useQuery(queries.GET_USER_LOCALE, {
    variables: {
      userID: userId,
    },
    onCompleted: (data) => {
      const locale = data?.user.settings.edges[0]?.node.value
      if (locale) setUserLocale(userLanguage.get(locale))
    },
  })

  const { data: user, loading } = useGetUserDetails(userId)
  const userLastAccessDate = user?.amplitude?.last_used ?? ''

  const sinceDayLastAccess = () => {
    if (userLastAccessDate && !isGetUserLocaleLoading) {
      const difference = differenceInDays(new Date(`${userLastAccessDate}T00:00`), new Date())
      if (difference === 0) {
        return intl.formatMessage(messages.todayLastAccess)
      }

      const formatedDistance = formatDistance(new Date(`${userLastAccessDate}T00:00`), new Date(), {
        addSuffix: true,
        locale: userLocale,
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
