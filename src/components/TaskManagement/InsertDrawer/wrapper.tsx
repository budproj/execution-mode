import { Flex, Stack, Drawer, DrawerContent, DrawerOverlay, useToast } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import { isEditingKeyResultIDAtom } from 'src/state/recoil/key-result/drawers/editing/is-editing-key-result-id'
import { taskInsertDrawerTeamID } from 'src/state/recoil/task-management/drawers/insert/task-insert-drawer'

import { keyResultInsertDrawerObjectiveID } from '../../../state/recoil/key-result/drawers/insert/objective-id'

import { InsertOrUpdateTaskForm } from './Form/wrapper'
import { KeyResultInsertOrUpdateDrawerHeader } from './header'
import messages from './messages'

export const TaskInsertDrawer = () => {
  const drawerObjectiveID = useRecoilValue(keyResultInsertDrawerObjectiveID)
  const taskBoardID = useRecoilValue(taskInsertDrawerTeamID)
  const editingModeKeyResultID = useRecoilValue(isEditingKeyResultIDAtom)

  const resetTaskBoardID = useResetRecoilState(taskInsertDrawerTeamID)
  const intl = useIntl()
  const toast = useToast()

  const isOpen = Boolean(taskBoardID)

  const handleResetDrawerState = async () => {
    resetTaskBoardID()
  }

  const handleSuccess = (currentUserID: string) => {
    handleResetDrawerState()
    toast({
      title: intl.formatMessage(messages.successToastMessage, {
        isEditing: Boolean(editingModeKeyResultID),
      }),
      status: 'success',
    })
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
            <InsertOrUpdateTaskForm isLoading={false} />
          </Flex>
        </Stack>
      </DrawerContent>
    </Drawer>
  )
}
