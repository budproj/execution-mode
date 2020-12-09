import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import CheckInForm from 'src/components/KeyResult/CheckInForm'
import { KeyResult } from 'src/components/KeyResult/types'

import messages from './messages'

export interface KeyResultSingleCheckInProperties {
  keyResultID?: KeyResult['id']
}

const CheckIn = ({ keyResultID }: KeyResultSingleCheckInProperties) => {
  const intl = useIntl()

  return (
    <Flex gridGap={2} direction="column">
      <Text fontWeight={500} color="gray.600">
        {intl.formatMessage(messages.label)}
      </Text>
      <CheckInForm submitOnBlur showGoal keyResultID={keyResultID} />
    </Flex>
  )
}

export default CheckIn
