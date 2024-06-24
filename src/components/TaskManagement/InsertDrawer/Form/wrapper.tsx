import { FormControl, Stack, Text, VStack } from '@chakra-ui/react'
import { addDays, addHours, format, set } from 'date-fns'
import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'
import * as Yup from 'yup'

import { TaskPriority } from 'src/components/Base/KanbanTaskCard/kanban-task-card-root'
import { Task, TASK_STATUS } from 'src/services/task-management/task-management.service'
import { taskDrawerAtom } from 'src/state/recoil/task-management/drawers/task-drawer/task-drawer'
import meAtom from 'src/state/recoil/user/me'

import useColumnTasks from '../../Board/hooks/use-column-tasks'
import { BOARD_DOMAIN } from '../../hooks/use-team-tasks-board-data'

import { FormActions } from './actions'
import { DescriptionInput } from './description'
import { DueDateInput } from './due-date'
import messages from './messages'
import { OwnerInput } from './owner'
import { PriorityInput } from './priority'
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
  onValidationError,
  column,
  boardID,
  isLoading,
  isEditing,
  domain,
  identifier,
}: InsertKeyResultFormProperties) => {
  const intl = useIntl()
  const myID = useRecoilValue(meAtom)

  const NewTaskSchema = Yup.object().shape({
    title: Yup.string().required(intl.formatMessage(messages.titleRequiredText)),
    priority: Yup.string().required(),
    description: Yup.string(),
    initialDate: Yup.date(),
    dueDate: Yup.date()
      .min(Yup.ref('initialDate'), intl.formatMessage(messages.dueDateBeforeInitialDateText))
      .max(new Date(2100, 11, 31), intl.formatMessage(messages.dueDateAfter2030Text))
      .required(),
    ownerID: Yup.string().required(),
  })

  const [validationErrors, setValidationErrors] = useState<Array<keyof FormValues>>([])
  const { addTask, updateTask } = useColumnTasks(column, boardID, domain, identifier)
  const taskDrawer = useRecoilValue(taskDrawerAtom)

  const formInitialValues: FormValues = {
    title: '',
    priority: 4,
    initialDate: new Date(),
    dueDate: new Date(),
    description: ' ',
    ownerID: myID,
  }

  const taskDrawerFormatted = {
    ...taskDrawer,
    dueDate: taskDrawer ? format(new Date(taskDrawer?.dueDate), 'yyyy-MM-dd') : new Date(),
    initialDate: taskDrawer ? format(new Date(taskDrawer?.initialDate), 'yyyy-MM-dd') : new Date(),
    ownerID: taskDrawer?.owner,
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
      initialDate: set(new Date(allValues.initialDate), {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      }),
      dueDate: set(addDays(new Date(allValues.dueDate), 1), {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      }),
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
      dueDate: addHours(new Date(allValues.dueDate), 3).toISOString(),
      initialDate: addHours(new Date(allValues.initialDate), 3).toISOString(),
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
      {({ errors }) => (
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
              <DescriptionInput
                isLoading={isLoading}
                hasValidationErrors={validationErrors.includes('description')}
              />
              {errors.description && (
                <Text alignSelf="flex-start" color="red">
                  {errors.description}
                </Text>
              )}
            </VStack>

            <Stack direction="row" spacing={6}>
              <StartDateInput isLoading={isLoading} />
              <DueDateInput isLoading={isLoading} />
            </Stack>
            {errors.dueDate && (
              <Text alignSelf="flex-start" color="red">
                {String(errors.dueDate)}
              </Text>
            )}

            <OwnerInput isLoading={isLoading} />

            <FormActions isLoading={isLoading} onClose={onClose} />
          </FormControl>
        </Form>
      )}
    </Formik>
  )
}

export default InsertOrUpdateTaskForm
