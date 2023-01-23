import { Circle, Flex, Skeleton, Text } from '@chakra-ui/react'
import React from 'react'

import { Location } from 'src/components/Icon'
import { User } from 'src/components/User/types'

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
  const colorTheme =
    (totalOfDoneCheckIns && totalOfDoneCheckIns > 0) || totalOfKeyResultsThatNeedsCheckIn === 0
      ? grayTheme
      : redTheme

  const isUserCheckinOcurrencesLoaded = isLoaded

  return (
    <Flex alignItems="center" color={colorTheme.color} gap={2}>
      <Skeleton isLoaded={isUserCheckinOcurrencesLoaded} borderRadius="50%">
        <Circle
          bg={colorTheme.bgColor}
          color="currentcolor"
          size="1.4em"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Location desc="dsadas" fill="currentcolor" />
        </Circle>
      </Skeleton>
      <Skeleton isLoaded={isUserCheckinOcurrencesLoaded}>
        <Text fontSize={16} fontWeight="medium">
          {totalOfDoneCheckIns}/{totalOfKeyResultsThatNeedsCheckIn}
        </Text>
      </Skeleton>
    </Flex>
  )
}

export default UserCheckinOccurrences
