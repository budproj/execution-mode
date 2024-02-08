import { FormControl, Stack, VStack } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { TaskPriority } from 'src/components/Base/KanbanTaskCard/kanban-task-card-root'
import { TASK_STATUS } from 'src/services/task-management/task-management.service'
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

interface InsertKeyResultFormProperties {
  onClose?: () => void
  onSuccess?: () => void
  onError?: () => void
  isLoading: boolean
  isEditing?: boolean
  onValidationError?: () => void
  column: TASK_STATUS
  boardID: string
  domain: BOARD_DOMAIN
  identifier: string
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
  console.log(onError)
  console.log(isEditing)

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

  const handleSubmit = async (values: FormValues): Promise<void> => {
    // Await delay(500)

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

    if (isEditing) {
      updateTask(taskDrawer._id, values)
      if (onSuccess) onSuccess()
    }

    addTask(variables)
    if (onSuccess) onSuccess()
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={NewTaskSchema}
      onSubmit={handleSubmit}
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

          <FormActions isLoading={isLoading} editingTaskId="as" onClose={onClose} />
        </FormControl>
      </Form>
    </Formik>
  )
}

export default InsertOrUpdateTaskForm
