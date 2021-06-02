import { useMutation } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import { FormControl } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { lastInsertedKeyResultIDAtom } from '../../../../state/recoil/key-result/drawers/insert/last-inserted-key-result-id-atom'
import meAtom from '../../../../state/recoil/user/me'
import { KEY_RESULT_FORMAT, KEY_RESULT_TYPE } from '../../constants'
import { KeyResult } from '../../types'

import { FormActions } from './actions'
import { DescriptionInput } from './description'
import { FormatInput } from './format'
import { GoalInput } from './goal'
import { InitialValueInput } from './initial-value'
import { OwnerInput } from './owner'
import queries from './queries.gql'
import { TitleInput } from './title'

export type FormValues = {
  objectiveID?: string
  teamID?: string
  title: string
  description: string
  format: KEY_RESULT_FORMAT
  initialValue: number
  goal: number
  ownerID: string
}

interface InsertKeyResultFormProperties {
  onClose?: () => void
  onSuccess?: () => void
  onError?: () => void
  onValidationError?: () => void
  objectiveID?: string
  teamID?: string
}

interface CreateKeyResultMutationResult {
  createKeyResult: KeyResult
}

const defineKeyResultType = (values: FormValues): KEY_RESULT_TYPE => {
  return values.initialValue <= values.goal ? KEY_RESULT_TYPE.ASCENDING : KEY_RESULT_TYPE.DESCENDING
}

export const InsertKeyResultForm = ({
  onClose,
  onSuccess,
  onError,
  onValidationError,
  objectiveID,
  teamID,
}: InsertKeyResultFormProperties) => {
  const [validationErrors, setValidationErrors] = useState<Array<keyof FormValues>>([])
  const currentUserID = useRecoilValue(meAtom)
  const setLastInsertedKeyResultID = useSetRecoilState(lastInsertedKeyResultIDAtom)
  const [createKeyResult, { data, error }] = useMutation<CreateKeyResultMutationResult>(
    queries.CREATE_KEY_RESULT,
  )
  const initialValues: FormValues = {
    objectiveID,
    teamID,
    title: '',
    description: '',
    format: KEY_RESULT_FORMAT.PERCENTAGE,
    initialValue: 0,
    goal: 100,
    ownerID: currentUserID,
  }

  const validateFields = (values: FormValues): boolean => {
    const invalidFields: Array<keyof FormValues> = []
    if (!values.title || values.title === '') invalidFields.push('title')

    if (invalidFields !== validationErrors) setValidationErrors(invalidFields)

    return invalidFields.length === 0
  }

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const areAllFieldsValid = validateFields(values)
    if (!areAllFieldsValid) {
      if (onValidationError) onValidationError()
      return
    }

    const variables = {
      ...values,
      type: defineKeyResultType(values),
    }

    await createKeyResult({ variables }).catch(() => {
      if (onError) onError()
    })
  }

  useEffect(() => {
    if (data && !error) {
      if (onSuccess) onSuccess()
      setLastInsertedKeyResultID(data.createKeyResult.id)
    }
  }, [data, error, onSuccess, setLastInsertedKeyResultID])

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <FormControl
          id="key-result-insert"
          display="flex"
          flexDirection="column"
          p={8}
          gridGap={8}
          h="full"
        >
          <TitleInput hasValidationErrors={validationErrors.includes('title')} />
          <DescriptionInput />
          <FormatInput />

          <Stack direction="row" spacing={4}>
            <InitialValueInput />
            <GoalInput />
          </Stack>

          <OwnerInput />

          <FormActions onClose={onClose} />
        </FormControl>
      </Form>
    </Formik>
  )
}
