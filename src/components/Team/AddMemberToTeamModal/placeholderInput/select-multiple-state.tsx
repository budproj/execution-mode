import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import EmptyMultipleAvatarsIcon from 'src/components/Icon/EmptyAvatar/empty-multiples-avatars'

import messages from '../messages'

type SelectMultipleUsersStateProperties = {
  qtdUsers: number
}

const SelectMultipleUsersState = ({ qtdUsers }: SelectMultipleUsersStateProperties) => {
  const intl = useIntl()

  return (
    <Flex alignItems="center" justify="left" gap={4}>
      <EmptyMultipleAvatarsIcon desc={intl.formatMessage(messages.selectMultipleUsersInputState)} />
      <Text>
        {intl.formatMessage(messages.selectMultipleUsersInputState, {
          selectedusersquantity: qtdUsers,
        })}
      </Text>
    </Flex>
  )
}

export default SelectMultipleUsersState
