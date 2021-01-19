import { Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import useRelativeDate from 'src/state/hooks/useRelativeDate'

import messages from './messages'

export interface LastUpdateTextProperties {
  date?: Date
  author?: string
}

const LastUpdateText = ({ date, author }: LastUpdateTextProperties) => {
  const intl = useIntl()
  const [formattedRelativeDate] = useRelativeDate(date)

  const currentDate = new Date()
  const updateDate = new Date(date ?? currentDate)

  const hour = intl.formatTime(updateDate)
  const message = formattedRelativeDate
    ? intl.formatMessage(messages.lastUpdateAt, {
        day: formattedRelativeDate,
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
