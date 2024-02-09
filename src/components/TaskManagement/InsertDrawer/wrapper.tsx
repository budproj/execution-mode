import { Flex, Stack, Drawer, DrawerContent, DrawerOverlay, useToast } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import { isEditingTaskDrawerIdAtom } from 'src/state/recoil/task-management/drawers/insert/is-editing-task-drawer'
import { taskInsertDrawerTeamID } from 'src/state/recoil/task-management/drawers/insert/task-insert-drawer'

import { TaskInsertOrUpdateDrawerHeader } from './header'
import messages from './messages'

const InsertOrUpdateTaskForm = dynamic(async () => import('./Form/wrapper'))

export const TaskInsertDrawer = () => {
  // Const drawerObjectiveID = useRecoilValue(keyResultInsertDrawerObjectiveID)
  const isEditingTaskDrawerId = useRecoilValue(isEditingTaskDrawerIdAtom)
  const { column, boardID, domain, identifier } = useRecoilValue(taskInsertDrawerTeamID)

  const resetTaskBoardID = useResetRecoilState(taskInsertDrawerTeamID)
  const intl = useIntl()
  const toast = useToast()

  const isOpen = Boolean(boardID)

  const handleResetDrawerState = async () => {
    resetTaskBoardID()
  }

  const handleSuccess = () => {
    handleResetDrawerState()
    toast({
      title: intl.formatMessage(messages.successToastMessage, {
        isEditing: Boolean(isEditingTaskDrawerId),
      }),
      status: 'success',
    })
  }

  // Const handleError = () => {
  //   toast({
  //     title: intl.formatMessage(messages.unexpectedErrorToastMessage),
  //     status: 'error',
  //   })
  // }

  // const handleValidationError = () => {
  //   toast({
  //     title: intl.formatMessage(messages.validationErrorToastMessage),
  //     status: 'error',
  //   })
  // }

  const isEditing = Boolean(isEditingTaskDrawerId)

  return (
    <Drawer isOpen={isOpen} size="xl" placement="right" onClose={handleResetDrawerState}>
      <DrawerOverlay />
      <DrawerContent overflowY="auto" flexGrow={1}>
        <Stack h="full">
          <TaskInsertOrUpdateDrawerHeader isEditing={isEditing} />
          <Flex flexGrow={1}>
            {boardID && identifier && (
              <InsertOrUpdateTaskForm
                isLoading={false}
                column={column}
                boardID={boardID}
                isEditing={isEditing}
                domain={domain}
                identifier={identifier}
                onSuccess={handleSuccess}
              />
            )}
          </Flex>
        </Stack>
      </DrawerContent>
    </Drawer>
  )
}
