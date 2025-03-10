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
  const isEditingTaskDrawerId = useRecoilValue(isEditingTaskDrawerIdAtom)
  const resetIsEditingTaskDrawerId = useResetRecoilState(isEditingTaskDrawerIdAtom)
  const { column, teamId } = useRecoilValue(taskInsertDrawerTeamID)
  const resetTaskBoardID = useResetRecoilState(taskInsertDrawerTeamID)

  const intl = useIntl()
  const toast = useToast()

  const isOpen = Boolean(teamId)

  const handleResetDrawerState = async () => {
    resetTaskBoardID()
    resetIsEditingTaskDrawerId()
  }

  const handleSuccess = () => {
    handleResetDrawerState()
    resetIsEditingTaskDrawerId()
    toast({
      title: intl.formatMessage(messages.successToastMessage, {
        isEditing: Boolean(isEditingTaskDrawerId),
      }),
      status: 'success',
    })
  }

  const isEditing = Boolean(isEditingTaskDrawerId)

  return (
    <Drawer isOpen={isOpen} size="xl" placement="right" onClose={handleResetDrawerState}>
      <DrawerOverlay />
      <DrawerContent overflowY="auto" flexGrow={1}>
        <Stack h="full">
          <TaskInsertOrUpdateDrawerHeader isEditing={isEditing} />
          <Flex flexGrow={1}>
            {teamId && (
              <InsertOrUpdateTaskForm
                isLoading={false}
                column={column}
                teamId={teamId}
                isEditing={isEditing}
                onSuccess={handleSuccess}
              />
            )}
          </Flex>
        </Stack>
      </DrawerContent>
    </Drawer>
  )
}
