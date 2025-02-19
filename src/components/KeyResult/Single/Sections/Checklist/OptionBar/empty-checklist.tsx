import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'

import { Feature } from '../../../../../../state/hooks/useEvent/feature'

import { CreateTaskButton } from '../ActionButtons/create-task-in-kr'
import messages from './messages'

interface EmptyChecklistProperties {
  onCreate: () => void
  canCreate: boolean
  keyResultID?: string
}

export const EmptyChecklist = ({ keyResultID, canCreate, onCreate }: EmptyChecklistProperties) => {
  const intl = useIntl()
  const { dispatch } = useEvent(EventType.KEY_RESULT_CREATE_CHECKLIST, {
    feature: Feature.CHECK_MARK,
  })

  const handleOnCreate = () => {
    onCreate()
    if (keyResultID) dispatch({ keyResultID })
  }

  return (
    <Flex flexGrow={1} justifyContent="flex-end">
      {canCreate && (
        <CreateTaskButton
          isAbsolute
          keyResultID={keyResultID}
          label={intl.formatMessage(messages.newChecklistButtonLabel)}
          onCreate={handleOnCreate}
        />
      )}
    </Flex>
  )
}
