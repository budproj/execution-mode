import { Circle, Flex, Text } from '@chakra-ui/react'
import React from 'react'

import { Location } from 'src/components/Icon'
import { User } from 'src/components/User/types'

export interface UserCheckinOccurrencesProperties {
  userId: User['id']
  totalOfKeyResultsThatNeedsCheckIn: number
  totalOfDoneCheckIns: number
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
}: UserCheckinOccurrencesProperties) => {
  const colorTheme =
    totalOfDoneCheckIns > 0 || totalOfKeyResultsThatNeedsCheckIn === 0 ? grayTheme : redTheme

  return (
    <Flex alignItems="center" color={colorTheme.color} gap={2}>
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
      <Text fontSize={16} fontWeight="medium">
        {totalOfDoneCheckIns}/{totalOfKeyResultsThatNeedsCheckIn}
      </Text>
    </Flex>
  )
}

export default UserCheckinOccurrences
