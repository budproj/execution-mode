import { Flex, Square, Text } from '@chakra-ui/react'
import React from 'react'

import CheckIcon from 'src/components/Icon/Check'

export interface UserChecklistProgressProperties {
  total: number
  checked: number
}

const grayTheme = {
  bgColor: 'gray.100',
  color: 'new-gray.800',
}

const redTheme = {
  bgColor: 'red.50',
  color: 'red.500',
}

const UserChecklistProgress = ({ total, checked }: UserChecklistProgressProperties) => {
  const colorTheme = total === 0 && checked === 0 ? redTheme : grayTheme

  return (
    <Flex alignItems="center" color={colorTheme.color} gap={2}>
      <Square
        bg={colorTheme.bgColor}
        color="currentcolor"
        borderRadius={5}
        size="1.4em"
        alignContent="center"
      >
        <CheckIcon desc="dsadas" fill="currentcolor" fontWeight="black" w="1.4em" h="1.4em" />
      </Square>
      <Text fontSize={16} fontWeight="medium">
        {total}/{checked}
      </Text>
    </Flex>
  )
}

export default UserChecklistProgress
