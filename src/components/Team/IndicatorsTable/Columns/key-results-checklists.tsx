import { Flex, Square, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { IntlLink } from 'src/components/Base'
import CheckIcon from 'src/components/Icon/Check'
import { User } from 'src/components/User/types'

import CheckInCheckListSkeleton from './checkin-checklist-skeleton'
import messages from './messages'

export interface UserChecklistProgressProperties {
  userId: User['id']
  checked?: number
  total?: number
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

const UserChecklistProgress = ({
  checked,
  total,
  userId,
  isLoaded,
}: UserChecklistProgressProperties) => {
  const colorTheme = total === 0 && checked === 0 ? redTheme : grayTheme
  const intl = useIntl()

  const isChecklistProgressLoaded = isLoaded

  return (
    <IntlLink href={`/profile/${userId}`}>
      {isChecklistProgressLoaded ? (
        <Flex alignItems="center" color={colorTheme.color} px={2} gap={2}>
          <Square
            bg={colorTheme.bgColor}
            color="currentcolor"
            borderRadius={5}
            size="1.4em"
            alignContent="center"
          >
            <CheckIcon
              desc={intl.formatMessage(messages.checklistColumnIconDesc)}
              fill="currentcolor"
              fontWeight="black"
              w="1.4em"
              h="1.4em"
            />
          </Square>
          <Text
            fontSize={16}
            fontWeight="medium"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {checked}/{total}
          </Text>
        </Flex>
      ) : (
        <CheckInCheckListSkeleton />
      )}
    </IntlLink>
  )
}

export default UserChecklistProgress
