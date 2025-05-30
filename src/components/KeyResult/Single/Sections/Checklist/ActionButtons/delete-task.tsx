import React, { Ref } from 'react'
import { useIntl } from 'react-intl'

import { DeleteButton } from 'src/components/Base/Button/delete-button'
import { useDeleteTaskByKr } from 'src/components/TaskManagement/hooks/use-delete-tasks'

import messages from './messages'

interface DeleteTaskButtonProperties {
  taskID?: string
  onDelete?: () => void
  isVisible?: boolean
  canDelete?: boolean
  buttonRef?: Ref<HTMLButtonElement>
  className?: string
}

export const DeleteTaskButton = ({
  taskID,
  isVisible,
  canDelete,
  onDelete: refresh,
  ...rest
}: DeleteTaskButtonProperties) => {
  isVisible ??= true

  const intl = useIntl()

  const { mutateAsync: deleteTask } = useDeleteTaskByKr()

  const handleDelete = async () => {
    await deleteTask({ taskID: taskID as string })

    if (refresh) refresh()
  }

  return canDelete ? (
    <DeleteButton
      canDelete={canDelete}
      description={intl.formatMessage(messages.removeIconDescription)}
      isVisible={isVisible}
      onDelete={handleDelete}
      {...rest}
    />
  ) : // eslint-disable-next-line unicorn/no-null
  null
}
