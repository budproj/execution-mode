import { Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import useRelativeDate from 'src/state/hooks/useRelativeDate'

import messages from './messages'

export interface LastUpdateTextProperties {
  date?: Date
  author?: string
}

const LastUpdateText = ({ date, author }: LastUpdateTextProperties) => {
  const intl = useIntl()
  const [formattedRelativeDate, setDate, relativeUnit, previousDate] = useRelativeDate(date)
  const lowercasedFormattedRelativeDate = formattedRelativeDate?.toLowerCase()

  const message = formattedRelativeDate
    ? intl.formatMessage(messages.lastUpdateAt, {
        date: lowercasedFormattedRelativeDate,
        unit: relativeUnit,
        author,
      })
    : intl.formatMessage(messages.emptyStateMessage)

  useEffect(() => {
    if (previousDate !== date) setDate(date)
  }, [previousDate, date, setDate])

  return (
    <Text fontSize="xs" color="gray.300">
      {message}
    </Text>
  )
}

export default LastUpdateText
