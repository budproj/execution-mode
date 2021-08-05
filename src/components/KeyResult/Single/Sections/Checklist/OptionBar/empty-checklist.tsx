import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { NewCheckMark } from '../new-checkmark'

import messages from './messages'

interface EmptyChecklistProperties {
  refresh: () => void
  keyResultID?: string
}

export const EmptyChecklist = ({ keyResultID, refresh }: EmptyChecklistProperties) => {
  const intl = useIntl()

  return (
    <Flex flexGrow={1} justifyContent="flex-end">
      <NewCheckMark
        refresh={refresh}
        keyResultID={keyResultID}
        label={intl.formatMessage(messages.newChecklistButtonLabel)}
      />
    </Flex>
  )
}
