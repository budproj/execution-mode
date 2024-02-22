import { FormControl, Stack, VStack } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { TaskPriority } from 'src/components/Base/KanbanTaskCard/kanban-task-card-root'
import { Task, TASK_STATUS } from 'src/services/task-management/task-management.service'
import { taskDrawerAtom } from 'src/state/recoil/task-management/drawers/task-drawer/task-drawer'

import useColumnTasks from '../../Board/hooks/use-column-tasks'
import { BOARD_DOMAIN } from '../../hooks/use-team-tasks-board-data'

import { FormActions } from './actions'
import { DescriptionInput } from './description'
import { DueDateInput } from './due-date'
import { OwnerInput } from './owner'
import { PriorityInput } from './priority'
import { NewTaskSchema } from './schema'
import { StartDateInput } from './start-date'
import { TitleInput } from './title'

export type FormValues = {
  boardID?: string
  title: string
  priority: TaskPriority
  description: string
  initialDate: Date
  dueDate: Date
  ownerID: string
}

const formInitialValues: FormValues = {
  title: '',
  priority: 4,
  initialDate: new Date(),
  dueDate: new Date(),
  description: '',
  ownerID: '',
}

function getUpdatePatches<T extends Record<string, unknown>>(
  oldTaskState: T,
  newTaskState: T,
): Partial<T> {
  const differingAttributes: Partial<T> = {}

  const keys: Array<keyof T> = Object.keys(oldTaskState) as Array<keyof T>

  for (const key of keys) {
    if (oldTaskState[key] !== newTaskState[key]) {
      differingAttributes[key] = newTaskState[key]
    }
  }

  return differingAttributes
}

interface InsertKeyResultFormProperties {
  readonly onClose?: () => void
  readonly onSuccess?: () => void
  readonly onError?: () => void
  readonly isLoading: boolean
  readonly isEditing?: boolean
  readonly onValidationError?: () => void
  readonly column: TASK_STATUS
  readonly boardID: string
  readonly domain: BOARD_DOMAIN
  readonly identifier: string
}

const InsertOrUpdateTaskForm = ({
  onClose,
  onSuccess,
  onError,
  onValidationError,
  column,
  boardID,
  isLoading,
  isEditing,
  domain,
  identifier,
}: InsertKeyResultFormProperties) => {
  const [validationErrors, setValidationErrors] = useState<Array<keyof FormValues>>([])
  const { addTask, updateTask } = useColumnTasks(column, boardID, domain, identifier)
  const taskDrawer = useRecoilValue(taskDrawerAtom)

  // Const router = useRouter()

  // Const currentUserID = useRecoilValue(meAtom)
  // const userIdQuery = router.query?.['user-id']
  // const userId = Array.isArray(userIdQuery) ? userIdQuery[0] : userIdQuery

  const taskDrawerFormatted = {
    ...taskDrawer,
    dueDate: new Date(taskDrawer?.dueDate),
    initialDate: new Date(taskDrawer?.initialDate),
  }

  const [initialValues, _] = useState<FormValues>(
    taskDrawer
      ? (taskDrawerFormatted as unknown as FormValues)
      : formInitialValues || formInitialValues,
  )

  const validateFields = (values: FormValues): boolean => {
    const invalidFields: Array<keyof FormValues> = []
    if (!values.title || values.title === '') invalidFields.push('title')

    if (invalidFields !== validationErrors) setValidationErrors(invalidFields)

    return invalidFields.length === 0
  }

  const handleCreateTaskSubmit = async (values: FormValues): Promise<void> => {
    const allValues = { ...values }

    const areAllFieldsValid = validateFields(allValues)

    if (!areAllFieldsValid) {
      if (onValidationError) onValidationError()
      return
    }

    const variables = {
      ...allValues,
      boardId: boardID,
      status: column,
      owner: allValues.ownerID,
      attachments: [],
      supportTeamMembers: [],
      tags: [],
    }

    addTask(variables)
    if (onSuccess) onSuccess()
  }

  const handleEditSubmit = async (values: FormValues): Promise<void> => {
    const allValues = { ...values }

    const areAllFieldsValid = validateFields(allValues)

    if (!areAllFieldsValid) {
      if (onValidationError) onValidationError()
      return
    }

    const variables = {
      ...allValues,
      boardId: boardID,
      status: column,
      owner: allValues.ownerID,
      dueDate: new Date(allValues.dueDate).toISOString(),
      initialDate: new Date(allValues.initialDate).toISOString(),
    }

    const newTask = getUpdatePatches(taskDrawer, variables as unknown as Task)

    updateTask(taskDrawer._id, { _id: taskDrawer._id, ...newTask })

    if (onSuccess) onSuccess()
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={NewTaskSchema}
      onSubmit={isEditing ? handleEditSubmit : handleCreateTaskSubmit}
    >
      <Form style={{ width: '100%' }}>
        <FormControl
          id="task-insert-or-update"
          display="flex"
          flexDirection="column"
          p={8}
          gridGap={8}
          h="full"
        >
          <VStack gap={2}>
            <TitleInput
              hasValidationErrors={validationErrors.includes('title')}
              isLoading={isLoading}
            />
            <PriorityInput isLoading={isLoading} />

            <DescriptionInput isLoading={isLoading} />
          </VStack>
          {/* <DescriptionInput /> */}
          {/* {!isLoading && !editingModeKeyResult && <OkrExampleLink />} */}

          <Stack direction="row" spacing={6}>
            <StartDateInput isLoading={isLoading} />
            <DueDateInput isLoading={isLoading} />
          </Stack>

          <OwnerInput isLoading={isLoading} />

          <FormActions isLoading={isLoading} editingTaskId={taskDrawer?._id} onClose={onClose} />
        </FormControl>
      </Form>
    </Formik>
  )
}

export default InsertOrUpdateTaskForm
