import { Text, StyleProps } from '@chakra-ui/react'
import filter from 'lodash/filter'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import useRelativeDate from 'src/state/hooks/useRelativeDate'

import messages from './messages'

export interface LastUpdateTextProperties extends StyleProps {
  date?: Date
  author?: string
  prefix?: string
}

const LastUpdateText = ({ date, author, prefix, ...rest }: LastUpdateTextProperties) => {
  const intl = useIntl()
  const [formattedRelativeDate, setDate, relativeUnit, previousDate] = useRelativeDate(date)
  const lowercasedFormattedRelativeDate = formattedRelativeDate?.toLowerCase()

  const formattedDateMessage = formattedRelativeDate
    ? intl.formatMessage(messages.date, {
        date: lowercasedFormattedRelativeDate,
        unit: relativeUnit,
      })
    : intl.formatMessage(messages.emptyStateMessage)

  const message = filter([
    date && (prefix ?? intl.formatMessage(messages.prefix)),
    formattedDateMessage,
    author && intl.formatMessage(messages.author, { author }),
  ])
    .join(' ')
    .trim()

  useEffect(() => {
    if (previousDate !== date) setDate(date)
  }, [previousDate, date, setDate])

  return <Text {...rest}>{message}</Text>
}

LastUpdateText.defaultProps = {
  fontSize: 'sm',
  color: 'black.300',
}

export default LastUpdateText
