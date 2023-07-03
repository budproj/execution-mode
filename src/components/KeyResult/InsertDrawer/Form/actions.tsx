import { Button, Skeleton, Stack } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'
import { useResetRecoilState, useSetRecoilState } from 'recoil'

import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { isEditingKeyResultIDAtom } from 'src/state/recoil/key-result/drawers/editing/is-editing-key-result-id'
import { keyResultInsertDrawerObjectiveID } from 'src/state/recoil/key-result/drawers/insert/objective-id'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'

import { KEY_RESULT_MODE } from '../../constants'

import messages from './messages'

interface FormActionsInterface {
  onClose?: () => void
  isEditingKeyResult?: boolean
  isLoading?: boolean
  editingKeyResultId?: string
  keyResultMode?: KEY_RESULT_MODE
}

export const FormActions = ({
  onClose,
  isLoading,
  isEditingKeyResult,
  editingKeyResultId,
  keyResultMode,
}: FormActionsInterface) => {
  const intl = useIntl()
  const { dispatch: dispatchEventCreateDraftKeyResult } = useEvent(
    EventType.CREATE_DRAFT_KEY_RESULT_CLICK,
  )
  const resetKeyResultInsertDrawerObjectiveID = useResetRecoilState(
    keyResultInsertDrawerObjectiveID,
  )
  const resetEditingModeKeyResultID = useResetRecoilState(isEditingKeyResultIDAtom)

  const setKeyResultDrawerOpenedKeyResultID = useSetRecoilState(
    keyResultReadDrawerOpenedKeyResultID,
  )

  const { resetForm, submitForm, isSubmitting } = useFormikContext()

  const handleCancel = () => {
    if (isEditingKeyResult) {
      resetEditingModeKeyResultID()
      resetKeyResultInsertDrawerObjectiveID()
      setKeyResultDrawerOpenedKeyResultID(editingKeyResultId)
    }

    resetForm()
    if (onClose) onClose()
  }

  const handleSubmitForm = () => {
    submitForm()
    resetKeyResultInsertDrawerObjectiveID()
    resetEditingModeKeyResultID()
    setKeyResultDrawerOpenedKeyResultID(editingKeyResultId)

    if (!isEditingKeyResult && keyResultMode === KEY_RESULT_MODE.DRAFT) {
      dispatchEventCreateDraftKeyResult({})
    }
  }

  return (
    <Stack flexGrow={1} alignItems="flex-end" justifyContent="center" direction="row" pt={16}>
      <Skeleton isLoaded={!isLoading} flexGrow={1}>
        <Button variant="outline" colorScheme="brand" w="100%" onClick={handleCancel}>
          {intl.formatMessage(messages.firstActionButtonLabel)}
        </Button>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} flexGrow={1}>
        <Button
          variant="solid"
          w="100%"
          colorScheme="brand"
          isLoading={isSubmitting}
          onClick={handleSubmitForm}
        >
          {intl.formatMessage(messages.secondActionButtonLabel, { isEditing: isEditingKeyResult })}
        </Button>
      </Skeleton>
    </Stack>
  )
}
