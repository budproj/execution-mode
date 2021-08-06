import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { CreateCheckMarkButton } from '../ActionButtons/create-checkmark'

import messages from './messages'

interface EmptyChecklistProperties {
  refresh: () => void
  canCreate: boolean
  keyResultID?: string
}

export const EmptyChecklist = ({ keyResultID, refresh, canCreate }: EmptyChecklistProperties) => {
  const intl = useIntl()

  return (
    <Flex flexGrow={1} justifyContent="flex-end">
      {canCreate && (
        <CreateCheckMarkButton
          refresh={refresh}
          keyResultID={keyResultID}
          label={intl.formatMessage(messages.newChecklistButtonLabel)}
        />
      )}
    </Flex>
  )
}
