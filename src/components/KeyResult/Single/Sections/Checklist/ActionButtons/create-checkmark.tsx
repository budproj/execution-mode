import { useMutation } from '@apollo/client'
import { Button, Box, Spinner, StyleProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { Ref, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { EditableInputField } from 'src/components/Base'
import { PlusOutline } from 'src/components/Icon'
import { KeyResultCheckMark } from 'src/components/KeyResult/types'
import myTasksQueries from 'src/components/Page/MyThings/ActiveCycles/my-tasks/queries.gql'

import { EventType } from '../../../../../../state/hooks/useEvent/event-type'
import { Feature } from '../../../../../../state/hooks/useEvent/feature'
import { useEvent } from '../../../../../../state/hooks/useEvent/hook'
import { myselfAtom } from '../../../../../../state/recoil/shared/atoms'

import messages from './messages'
import queries from './queries.gql'

interface CreateCheckMarkButtonProperties extends StyleProps {
  keyResultID?: string
  label?: string
  isAbsolute?: boolean
  onCreate?: () => void
  createButtonReference?: Ref<HTMLButtonElement>
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
  const { dispatch } = useEvent(EventType.CREATED_KEY_RESULT_CHECK_MARK, {
    feature: Feature.CHECK_MARK,
  })

  const [isAdding, setIsAdding] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const intl = useIntl()
  const myself = useRecoilValue(myselfAtom)

  const [createCheckMark] = useMutation(queries.CREATE_CHECK_MARK, {
    refetchQueries: [
      myTasksQueries.GET_KRS_WITH_MY_CHECKMARKS,
      {
        variables: {
          ...(myself?.id ? { userID: myself?.id } : {}),
        },
      },
    ],
    onCompleted: () => {
      if (onCreate) onCreate()
    },
  })

  const handleNewCheckMark = async (description: KeyResultCheckMark['description']) => {
    if (isSubmitting) return

    if (description === '') {
      toggleAdd()
      return
    }

    setIsSubmitting(true)

    await createCheckMark({
      variables: {
        keyResultID,
        description,
      },
    })

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
