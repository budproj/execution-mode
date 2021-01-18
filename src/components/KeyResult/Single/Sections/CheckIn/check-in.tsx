import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import CheckInForm from 'src/components/KeyResult/CheckInForm'
import { KeyResult, ProgressReport } from 'src/components/KeyResult/types'

import EncouragingMessage from './encouraging-message'
import messages from './messages'

export interface KeyResultSectionCheckInProperties {
  keyResultID?: KeyResult['id']
}

const KeyResultSectionCheckIn = ({ keyResultID }: KeyResultSectionCheckInProperties) => {
  const [showMessage, setShowMessage] = useState(false)
  const intl = useIntl()

  const displayMessageUponNewProgressReport = (newProgress?: ProgressReport['valueNew']) => {
    if (newProgress) setShowMessage(true)
  }

  useEffect(() => {
    if (showMessage) setTimeout(() => setShowMessage(false), 3000)
  }, [showMessage, setShowMessage])

  return (
    <Flex gridGap={6} direction="column">
      <Flex gridGap={2} direction="column">
        <Text fontWeight={500} color="gray.600">
          {intl.formatMessage(messages.label)}
        </Text>
        <CheckInForm
          submitOnBlur
          showGoal
          keyResultID={keyResultID}
          afterSubmit={displayMessageUponNewProgressReport}
        />
      </Flex>
      <EncouragingMessage isOpen={showMessage} />
    </Flex>
  )
}

export default KeyResultSectionCheckIn
