import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import CheckInForm from 'src/components/KeyResult/CheckInForm'
import { KeyResult } from 'src/components/KeyResult/types'

import EncouragingMessage from './encouraging-message'
import messages from './messages'

export interface KeyResultSectionCheckInProperties {
  keyResultID?: KeyResult['id']
}

const KeyResultSectionCheckIn = ({ keyResultID }: KeyResultSectionCheckInProperties) => {
  const [showEncouragingMessage, setShowEncouragingMessage] = useState(false)
  const intl = useIntl()

  const handleSubmitSideEffects = () => {
    setShowEncouragingMessage(true)
  }

  useEffect(() => {
    if (showEncouragingMessage) setTimeout(() => setShowEncouragingMessage(false), 3000)
  }, [showEncouragingMessage, setShowEncouragingMessage])

  return (
    <Flex gridGap={6} direction="column">
      <Flex gridGap={2} direction="column">
        <Text fontWeight={500} color="gray.600">
          {intl.formatMessage(messages.label)}
        </Text>
        <CheckInForm
          showGoal
          isCommentAlwaysEnabled
          keyResultID={keyResultID}
          afterSubmit={handleSubmitSideEffects}
        />
      </Flex>
      <EncouragingMessage isOpen={showEncouragingMessage} />
    </Flex>
  )
}

export default KeyResultSectionCheckIn
