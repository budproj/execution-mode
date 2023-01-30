import { Circle, Flex, Skeleton, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { Location } from 'src/components/Icon'
import { User } from 'src/components/User/types'

import messages from './messages'

export interface UserCheckinOccurrencesProperties {
  userId: User['id']
  totalOfKeyResultsThatNeedsCheckIn?: number
  totalOfDoneCheckIns?: number
  isLoaded?: boolean
}

const grayTheme = {
  bgColor: 'gray.100',
  color: 'new-gray.800',
}

const redTheme = {
  bgColor: 'red.50',
  color: 'red.500',
}

const UserCheckinOccurrences = ({
  totalOfKeyResultsThatNeedsCheckIn,
  totalOfDoneCheckIns,
  isLoaded,
}: UserCheckinOccurrencesProperties) => {
  const intl = useIntl()

  const colorTheme =
    (totalOfDoneCheckIns && totalOfDoneCheckIns > 0) || totalOfKeyResultsThatNeedsCheckIn === 0
      ? grayTheme
      : redTheme

  const isUserCheckinOcurrencesLoaded = isLoaded

  return (
    <Flex alignItems="center" color={colorTheme.color}>
      <Skeleton isLoaded={isUserCheckinOcurrencesLoaded} borderRadius="50%">
        <Circle
          bg={colorTheme.bgColor}
          color="currentcolor"
          size="1.4em"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Location desc={intl.formatMessage(messages.checkinColumnIconDesc)} fill="currentcolor" />
        </Circle>
      </Skeleton>
      <Skeleton isLoaded={isUserCheckinOcurrencesLoaded}>
        <Text
          fontSize={16}
          fontWeight="medium"
          px={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {totalOfDoneCheckIns}/{totalOfKeyResultsThatNeedsCheckIn}
        </Text>
      </Skeleton>
    </Flex>
  )
}

export default UserCheckinOccurrences
