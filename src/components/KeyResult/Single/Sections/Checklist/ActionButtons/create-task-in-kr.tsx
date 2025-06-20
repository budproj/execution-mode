import { Button, Box, Spinner, StyleProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { Ref, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { EditableInputField } from 'src/components/Base'
import { PlusOutline } from 'src/components/Icon'
import { NewTask } from 'src/components/Task/types'
import { useAddTask } from 'src/components/TaskManagement/hooks/use-add-task-new'
import { TASK_STATUS } from 'src/services/new-task-management/@types/task-status.enum'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import meAtom from 'src/state/recoil/user/me'

import { EventType } from '../../../../../../state/hooks/useEvent/event-type'
import { useEvent } from '../../../../../../state/hooks/useEvent/hook'

import messages from './messages'

interface CreateTaskButtonProperties extends StyleProps {
  readonly keyResultID?: string
  readonly label?: string
  readonly isAbsolute?: boolean
  readonly teamId?: string
  readonly onCreate?: () => void
  readonly createButtonReference?: Ref<HTMLButtonElement>
}

const StyledEditableWrapper = styled(Box)`
  ${({ isAbsolute }) =>
    isAbsolute &&
    `
    text-align: left;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  `};
`

export const CreateTaskButton = ({
  label,
  keyResultID,
  createButtonReference,
  teamId,
  isAbsolute,
  onCreate,
  ...rest
}: CreateTaskButtonProperties) => {
  const { mutateAsync: addNewTask } = useAddTask()

  const [isAdding, setIsAdding] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const intl = useIntl()
  const userID = useRecoilValue(meAtom)
  const { dispatch } = useEvent(EventType.TASK_MANAGER_CREATE_TASK_CLICK)

  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))
  const hasData = Boolean(keyResult?.teamId)

  const handleNewCheckMark = async (title: NewTask['title']) => {
    if (isSubmitting) return

    if (title === '') {
      toggleAdd()
      return
    }

    setIsSubmitting(true)
    if (teamId || keyResult) {
      await addNewTask({
        team: teamId ?? keyResult?.teamId ?? '',
        status: TASK_STATUS.pending,
        title,
        description: '',
        initialDate: new Date(),
        dueDate: new Date(),
        priority: Math.floor(Math.random() * 4) + 1,
        owner: userID,
        attachments: [],
        supportTeam: [],
        tags: [],
        orderindex: 0,
        key_result: keyResultID,
        cycle: '',
      })
    }

    dispatch({ keyResultID })
    setIsSubmitting(false)
    toggleAdd()
    if (onCreate) onCreate()
  }

  const toggleAdd = () => {
    setIsAdding((isAdding) => !isAdding)
  }

  const previewProperties = {
    border: '2px solid #E3E8EE',
    width: '100%',
    padding: '0.5rem',
  }

  return (
    <Box width="100%" pb={isAdding && isAbsolute ? 14 : 0} {...rest}>
      {isAdding && (
        <StyledEditableWrapper isAbsolute={isAbsolute}>
          <EditableInputField
            startWithEditView
            value=""
            previewProperties={previewProperties}
            onSubmit={handleNewCheckMark}
            onCancel={toggleAdd}
          />
        </StyledEditableWrapper>
      )}
      {(teamId ?? hasData) && (
        <Button
          ref={createButtonReference}
          variant="text"
          p={0}
          h="auto"
          colorScheme="brand"
          isDisabled={isSubmitting}
          leftIcon={
            <>
              {isSubmitting && <Spinner color="brand.400" size="sm" mr={3} mt="0.1rem" />}
              <PlusOutline
                desc={intl.formatMessage(messages.newCheckMarkButtonIconDescription)}
                stroke="currentColor"
                fill="currentColor"
                fontSize="xl"
              />
            </>
          }
          onClick={toggleAdd}
        >
          {label ?? intl.formatMessage(messages.newCheckMarkButtonLabel)}
        </Button>
      )}
    </Box>
  )
}
