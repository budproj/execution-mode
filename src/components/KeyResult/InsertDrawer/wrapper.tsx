import { Flex, Stack, Drawer, DrawerContent, DrawerOverlay, useToast } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import { Team } from 'src/components/Team/types'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { isEditingKeyResultIDAtom } from 'src/state/recoil/key-result/drawers/editing/is-editing-key-result-id'

import { keyResultInsertDrawerObjectiveID } from '../../../state/recoil/key-result/drawers/insert/objective-id'
import useGetKeyResultWithId from '../Single/Drawer/hooks/get-key-result-with-id'

import { InsertOrUpdateKeyResultForm } from './Form/wrapper'
import { KeyResultInsertOrUpdateDrawerHeader } from './header'
import messages from './messages'

interface KeyResultInsertDrawerProperties {
  teamID?: Team['id'] | null
  isPersonalKR?: boolean
}

export const KeyResultInsertDrawer = ({
  teamID,
  isPersonalKR,
}: KeyResultInsertDrawerProperties) => {
  const drawerObjectiveID = useRecoilValue(keyResultInsertDrawerObjectiveID)
  const editingModeKeyResultID = useRecoilValue(isEditingKeyResultIDAtom)

  const { refetch } = useGetKeyResultWithId(editingModeKeyResultID)

  const resetDrawerObjectiveID = useResetRecoilState(keyResultInsertDrawerObjectiveID)
  const resetEditingModeKeyResultID = useResetRecoilState(isEditingKeyResultIDAtom)
  const { dispatch: dispatchCreateKeyResult } = useEvent(EventType.CREATED_KEY_RESULT)
  const intl = useIntl()
  const toast = useToast()

  const { data: keyResultData, loading: isKeyResultEditingLoading } =
    useGetKeyResultWithId(editingModeKeyResultID)

  const isOpen = Boolean(editingModeKeyResultID ?? drawerObjectiveID)

  const handleResetDrawerState = async () => {
    if (editingModeKeyResultID) {
      await refetch({ id: editingModeKeyResultID })
      resetEditingModeKeyResultID()
    }

    resetDrawerObjectiveID()
  }

  const handleSuccess = (currentUserID: string) => {
    handleResetDrawerState()
    toast({
      title: intl.formatMessage(messages.successToastMessage, {
        isEditing: Boolean(editingModeKeyResultID),
      }),
      status: 'success',
    })

    if (!editingModeKeyResultID)
      dispatchCreateKeyResult({ isPersonal: !teamID, userId: currentUserID })
  }

  const handleError = () => {
    toast({
      title: intl.formatMessage(messages.unexpectedErrorToastMessage),
      status: 'error',
    })
  }

  const handleValidationError = () => {
    toast({
      title: intl.formatMessage(messages.validationErrorToastMessage),
      status: 'error',
    })
  }

  const isEditing = Boolean(editingModeKeyResultID)

  return (
    <Drawer isOpen={isOpen} size="xl" placement="right" onClose={handleResetDrawerState}>
      <DrawerOverlay />
      <DrawerContent overflowY="auto" flexGrow={1}>
        <Stack h="full">
          <KeyResultInsertOrUpdateDrawerHeader isEditing={isEditing} />
          <Flex flexGrow={1}>
            <InsertOrUpdateKeyResultForm
              editingKeyResultId={editingModeKeyResultID}
              isPersonalKR={isPersonalKR}
              objectiveID={drawerObjectiveID}
              teamID={teamID}
              editingModeKeyResult={keyResultData?.keyResult}
              isLoading={isKeyResultEditingLoading ?? true}
              onClose={handleResetDrawerState}
              onSuccess={handleSuccess}
              onError={handleError}
              onValidationError={handleValidationError}
            />
          </Flex>
        </Stack>
      </DrawerContent>
    </Drawer>
  )
}
