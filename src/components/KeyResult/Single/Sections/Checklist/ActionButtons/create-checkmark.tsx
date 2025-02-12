import { Button, Box, Spinner, StyleProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { Ref, useCallback, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { EditableInputField } from 'src/components/Base'
import { PlusOutline } from 'src/components/Icon'
import { KeyResultCheckMark } from 'src/components/KeyResult/types'
import meAtom from 'src/state/recoil/user/me'

import { EventType } from '../../../../../../state/hooks/useEvent/event-type'
import { useEvent } from '../../../../../../state/hooks/useEvent/hook'

import messages from './messages'
import { useAddTask } from 'src/components/TaskManagement/hooks/use-add-task-new'
import { TaskInsert } from 'src/services/new-task-management/new-task-management.service'
import { TASK_STATUS } from 'src/components/Task/constants'
import { useRouter } from 'next/router'

interface CreateCheckMarkButtonProperties extends StyleProps {
  readonly keyResultID?: string
  readonly label?: string
  readonly isAbsolute?: boolean
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

export const CreateCheckMarkButton = ({
  label,
  keyResultID,
  createButtonReference,
  isAbsolute,
  onCreate,
  ...rest
}: CreateCheckMarkButtonProperties) => {
  const { mutate } = useAddTask()

  const [isAdding, setIsAdding] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const intl = useIntl()
  const userID = useRecoilValue(meAtom)
  const { dispatch } = useEvent(EventType.TASK_MANAGER_CREATE_TASK_CLICK)
  const router = useRouter()
  const { id } = router.query
  const addTask = useCallback(
    (task: TaskInsert) => {
      dispatch({ taskData: task })
      mutate(task)
    },
    [dispatch, mutate],
  )

  const addEmptyTask = useCallback(() => {
    addTask({
      team: 'f53c6168-9c21-42e3-b912-c4fe8acac849',
      status: TASK_STATUS.PENDING,
      title: `Nova tarefa`,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
      initialDate: new Date(),
      dueDate: new Date(),
      priority: Math.floor(Math.random() * 4) + 1,
      owner: '0194add4-2730-7fd7-851c-d69d9a17fc16',
      attachments: [],
      supportTeam: [],
      tags: [],
      orderindex: 0,
      key_result: '6d10cb65-e3d0-4753-92c0-dc065368c731',
      cycle: '',
    })
  }, [addTask, id, userID])

  const handleNewCheckMark = async (description: KeyResultCheckMark['description']) => {
    if (isSubmitting) return

    if (description === '') {
      toggleAdd()
      return
    }

    setIsSubmitting(true)

    addEmptyTask()

    dispatch({ keyResultID })
    setIsSubmitting(false)
    toggleAdd()
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
    </Box>
  )
}
