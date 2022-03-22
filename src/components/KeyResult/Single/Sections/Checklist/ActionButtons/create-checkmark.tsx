import { useMutation } from '@apollo/client'
import { Button, Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { Ref, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { EditableInputField } from 'src/components/Base'
import { PlusOutline } from 'src/components/Icon'
import { KeyResultCheckMark } from 'src/components/KeyResult/types'
import myTasksQueries from 'src/components/Page/MyThings/ActiveCycles/my-tasks/queries.gql'
import { draftCheckMarksAtom } from 'src/state/recoil/key-result/checklist'

import { EventType } from '../../../../../../state/hooks/useEvent/event-type'
import { Feature } from '../../../../../../state/hooks/useEvent/feature'
import { useEvent } from '../../../../../../state/hooks/useEvent/hook'

import messages from './messages'
import queries from './queries.gql'

interface CreateCheckMarkButtonProperties {
  keyResultID?: string
  label?: string
  isAbsolute?: boolean
  onCreate?: () => void
  createButtonReference?: Ref<HTMLButtonElement>
}

const StyledEditableInput = styled(Box)`
  ${({ isAbsolute }) =>
    isAbsolute &&
    `
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  `};
`

export const CreateCheckMarkButton = ({
  label,
  keyResultID,
  createButtonReference,
  isAbsolute,
  onCreate,
}: CreateCheckMarkButtonProperties) => {
  const { dispatch } = useEvent(EventType.CREATED_KEY_RESULT_CHECK_MARK, {
    feature: Feature.CHECK_MARK,
  })

  const [isAdding, setIsAdding] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const intl = useIntl()
  const [draftCheckMarks, setDraftCheckMarks] = useRecoilState(draftCheckMarksAtom(keyResultID))
  const [createCheckMark, { loading }] = useMutation(queries.CREATE_CHECK_MARK, {
    refetchQueries: [myTasksQueries.GET_KRS_WITH_MY_CHECKMARKS],
    onCompleted: (data) => {
      const newDraftCheckMarks = [...draftCheckMarks, data.createKeyResultCheckMark.id]
      setDraftCheckMarks(newDraftCheckMarks)

      if (onCreate) onCreate()
    },
  })

  const resetTaskAdition = () => {
    setIsSubmitting(false)
    toggleAdd()
  }

  const handleNewCheckMark = async (description: KeyResultCheckMark['description']) => {
    if (isSubmitting) return

    setIsSubmitting(true)

    await createCheckMark({
      variables: {
        keyResultID,
        description,
      },
    })

    dispatch({ keyResultID })
    resetTaskAdition()
  }

  const toggleAdd = () => {
    setIsAdding((isAdding) => !isAdding)
  }

  return (
    <Box width="100%" pt={isAdding && isAbsolute ? 14 : 0}>
      {isAdding && (
        <StyledEditableInput isAbsolute={isAbsolute}>
          <EditableInputField
            startWithEditView
            value=""
            onSubmit={handleNewCheckMark}
            onPressedEnter={handleNewCheckMark}
            onCancel={toggleAdd}
          />
        </StyledEditableInput>
      )}
      <Button
        ref={createButtonReference}
        variant="text"
        p={0}
        h="auto"
        colorScheme="brand"
        isDisabled={loading}
        leftIcon={
          <PlusOutline
            desc={intl.formatMessage(messages.newCheckMarkButtonIconDescription)}
            stroke="currentColor"
            fill="currentColor"
            fontSize="xl"
          />
        }
        onClick={toggleAdd}
      >
        {label ?? intl.formatMessage(messages.newCheckMarkButtonLabel)}
      </Button>
    </Box>
  )
}
