import { Button, Skeleton, Stack } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import { isEditingTaskDrawerIdAtom } from 'src/state/recoil/task-management/drawers/insert/is-editing-task-drawer'
import { taskInsertDrawerTeamID } from 'src/state/recoil/task-management/drawers/insert/task-insert-drawer'
import { taskDrawerAtom } from 'src/state/recoil/task-management/drawers/task-drawer/task-drawer'
import { taskDrawerIdAtom } from 'src/state/recoil/task-management/drawers/task-drawer/task-drawer-id'

import messages from './messages'

interface FormActionsInterface {
  readonly onClose?: () => void
  readonly isLoading?: boolean
}

export const FormActions = ({ onClose, isLoading }: FormActionsInterface) => {
  const intl = useIntl()

  const { resetForm, submitForm, isSubmitting } = useFormikContext()
  const resetEditing = useResetRecoilState(isEditingTaskDrawerIdAtom)
  const resetTaskInsertDrawerTeamId = useResetRecoilState(taskInsertDrawerTeamID)
  const taskDrawer = useRecoilValue(taskDrawerAtom)
  const setTaskDrawerId = useSetRecoilState(taskDrawerIdAtom)

  const handleCancel = () => {
    console.log('CANCELOU')
    resetForm()
    resetEditing()
    resetTaskInsertDrawerTeamId()
    if (taskDrawer) {
      setTaskDrawerId(taskDrawer._id)
    }

    if (onClose) onClose()
  }

  const handleSubmitForm = () => {
    submitForm()
  }

  return (
    <Stack flexGrow={1} alignItems="flex-end" justifyContent="center" direction="row" pt={5}>
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
          {intl.formatMessage(messages.secondActionButtonLabel)}
        </Button>
      </Skeleton>
    </Stack>
  )
}
