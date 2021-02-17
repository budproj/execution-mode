import { Text, TextProps } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import useRelativeDate from 'src/state/hooks/useRelativeDate'

import messages from './messages'

export interface LastUpdateTextProperties {
  fontSize: TextProps['fontSize']
  color: TextProps['color']
  date?: Date
  author?: string
  fontWeight?: TextProps['fontWeight']
}

const LastUpdateText = ({
  date,
  author,
  fontSize,
  fontWeight,
  color,
}: LastUpdateTextProperties) => {
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
    <Text fontSize={fontSize} color={color} fontWeight={fontWeight}>
      {message}
    </Text>
  )
}

LastUpdateText.defaultProps = {
  fontSize: 'sm',
  color: 'gray.300',
}

export default LastUpdateText
