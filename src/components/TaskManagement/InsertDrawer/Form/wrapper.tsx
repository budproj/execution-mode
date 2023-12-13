import { Stack, FormControl, VStack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { TaskPriority } from 'src/components/Base/KanbanTaskCard/kanban-task-card-root'

import meAtom from '../../../../state/recoil/user/me'

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
  title: 'Titulo default',
  priority: 4,
  initialDate: new Date('2021-08-01'),
  dueDate: new Date('2021-08-10'),
  description: '<h1>Teste</h1>',
  ownerID: '922ef72a-6c3c-4075-926a-3245cdeea75f',
}

interface InsertKeyResultFormProperties {
  onClose?: () => void
  onSuccess?: (currentUserID: string) => void
  onError?: () => void
  isLoading: boolean
  onValidationError?: () => void
  boardID?: string
}

export const InsertOrUpdateTaskForm = ({
  onClose,
  onSuccess,
  onError,
  onValidationError,
  boardID,
  isLoading,
}: InsertKeyResultFormProperties) => {
  const [validationErrors, setValidationErrors] = useState<Array<keyof FormValues>>([])

  const router = useRouter()

  const currentUserID = useRecoilValue(meAtom)
  const userIdQuery = router.query?.['user-id']
  const userId = Array.isArray(userIdQuery) ? userIdQuery[0] : userIdQuery

  const [initialValues, setInitialValues] = useState<FormValues>(formInitialValues)

  const validateFields = (values: FormValues): boolean => {
    const invalidFields: Array<keyof FormValues> = []
    if (!values.title || values.title === '') invalidFields.push('title')

    if (invalidFields !== validationErrors) setValidationErrors(invalidFields)

    return invalidFields.length === 0
  }

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const areAllFieldsValid = validateFields(values)

    const valorezinhos = values

    console.log({ valorezinhos })

    if (!areAllFieldsValid) {
      if (onValidationError) onValidationError()
      return
    }

    const variables = {
      ...values,
    }
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
