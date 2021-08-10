import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { CreateCheckMarkButton } from '../ActionButtons/create-checkmark'

import messages from './messages'

interface EmptyChecklistProperties {
  onCreate: () => void
  canCreate: boolean
  keyResultID?: string
}

export const EmptyChecklist = ({ keyResultID, canCreate, onCreate }: EmptyChecklistProperties) => {
  const intl = useIntl()

  return (
    <Flex flexGrow={1} justifyContent="flex-end">
      {canCreate && (
        <CreateCheckMarkButton
          keyResultID={keyResultID}
          label={intl.formatMessage(messages.newChecklistButtonLabel)}
          onCreate={onCreate}
        />
      )}
    </Flex>
  )
}
