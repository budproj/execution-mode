import { Text } from '@chakra-ui/react'
import { differenceInDays } from 'date-fns'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

export interface LastUpdateTextProperties {
  date?: Date
  author?: string
}

const LastUpdateText = ({ date, author }: LastUpdateTextProperties) => {
  const intl = useIntl()
  const currentDate = new Date()
  const updateDate = new Date(date ?? currentDate)
  const daysDifference = differenceInDays(updateDate, currentDate)
  const formatDay = () => {
    const formatters = {
      today: () => intl.formatMessage(messages.todayLabel).toLowerCase(),
      yesterday: () => intl.formatMessage(messages.yesterdayLabel).toLowerCase(),
      thisWeek: () => intl.formatRelativeTime(daysDifference, 'day'),
      longTimeAgo: () => intl.formatDate(updateDate),
    }

    let formatter = formatters.longTimeAgo
    if (daysDifference === 0) formatter = formatters.today
    if (daysDifference === -1) formatter = formatters.yesterday
    if (daysDifference < -1 && daysDifference > -8) formatter = formatters.thisWeek

    return formatter()
  }

  const day = formatDay()
  const hour = intl.formatTime(updateDate)
  const message = date
    ? intl.formatMessage(messages.lastUpdateAt, {
        day,
        hour,
        author,
      })
    : intl.formatMessage(messages.emptyStateMessage)

  return (
    <Text fontSize="13px" color="gray.300">
      {message}
    </Text>
  )
}

export default LastUpdateText
