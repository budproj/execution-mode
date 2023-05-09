import { useMutation } from '@apollo/client'
import { Stack, FormControl, VStack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { Team } from 'src/components/Team/types'

import { lastInsertedKeyResultIDAtom } from '../../../../state/recoil/key-result/drawers/insert/last-inserted-key-result-id-atom'
import meAtom from '../../../../state/recoil/user/me'
import { KEY_RESULT_FORMAT, KEY_RESULT_TYPE } from '../../constants'
import { KeyResult } from '../../types'

import { FormActions } from './actions'
import { DescriptionInput } from './description'
import { FormatInput } from './format'
import { GoalInput } from './goal'
import { InitialValueInput } from './initial-value'
import { OkrExampleLink } from './okr-example-link'
import { OwnerInput } from './owner'
import queries from './queries.gql'
import { TitleInput } from './title'

export type FormValues = {
  objectiveID?: string
  teamID?: Team['id'] | null
  title: string
  description: string
  format: KEY_RESULT_FORMAT
  initialValue: number
  goal: number
  ownerID: string
}

interface InsertKeyResultFormProperties {
  onClose?: () => void
  onSuccess?: (currentUserID: string) => void
  onError?: () => void
  editingModeKeyResult?: KeyResult
  isLoading: boolean
  onValidationError?: () => void
  objectiveID?: string
  teamID?: Team['id'] | null
  isPersonalKR?: boolean
}

interface CreateKeyResultMutationResult {
  createKeyResult: KeyResult
}

interface UpdateKeyResultMutationResult {
  id: KeyResult['id']
}

const defineKeyResultType = (values: FormValues): KEY_RESULT_TYPE => {
  return values.initialValue <= values.goal ? KEY_RESULT_TYPE.ASCENDING : KEY_RESULT_TYPE.DESCENDING
}

export const InsertOrUpdateKeyResultForm = ({
  onClose,
  onSuccess,
  onError,
  onValidationError,
  objectiveID,
  editingModeKeyResult,
  teamID,
  isLoading,
  isPersonalKR,
}: InsertKeyResultFormProperties) => {
  const [validationErrors, setValidationErrors] = useState<Array<keyof FormValues>>([])

  const router = useRouter()

  const currentUserID = useRecoilValue(meAtom)
  const userIdQuery = router.query?.['user-id']
  const userId = Array.isArray(userIdQuery) ? userIdQuery[0] : userIdQuery
  const ownerID = isPersonalKR ? userId ?? currentUserID : currentUserID

  const [initialValues, setInitialValues] = useState<FormValues>(() => ({
    objectiveID,
    // eslint-disable-next-line unicorn/no-null
    teamID: teamID ?? null,
    title: '',
    description: '',
    format: KEY_RESULT_FORMAT.PERCENTAGE,
    initialValue: 0,
    goal: 100,
    ownerID,
  }))

  const setLastInsertedKeyResultID = useSetRecoilState(lastInsertedKeyResultIDAtom)
  const [createKeyResult, { data, error }] = useMutation<CreateKeyResultMutationResult>(
    queries.CREATE_KEY_RESULT,
  )

  const [updateKeyResult, { data: updatedKeyResultData }] =
    useMutation<UpdateKeyResultMutationResult>(queries.UPDATE_KEY_RESULT)

  const keyResult = editingModeKeyResult

  useEffect(() => {
    if (keyResult)
      setInitialValues({
        objectiveID: keyResult.objective.id,
        teamID: keyResult.teamId,
        title: keyResult.title,
        description: keyResult.description ?? '',
        format: keyResult.format,
        initialValue: keyResult.initialValue,
        goal: keyResult.goal,
        ownerID: keyResult.owner.id,
      })
  }, [keyResult])

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

    await (editingModeKeyResult && keyResult
      ? updateKeyResult({
          variables: { id: keyResult.id, ...variables },
        }).catch(() => {
          if (onError) onError()
        })
      : createKeyResult({ variables }).catch(() => {
          if (onError) onError()
        }))
  }

  useEffect(() => {
    if ((data || updatedKeyResultData) && !error) {
      if (onSuccess) onSuccess(currentUserID)
      if (data) setLastInsertedKeyResultID(data.createKeyResult.id)
    }
  }, [data, error, currentUserID, onSuccess, setLastInsertedKeyResultID, updatedKeyResultData])

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <FormControl
          id="key-result-insert-or-update"
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

            <DescriptionInput isLoading={isLoading} />
          </VStack>
          {/* <DescriptionInput /> */}
          {!isLoading && !editingModeKeyResult && <OkrExampleLink />}
          <FormatInput isLoading={isLoading} />

          <Stack direction="row" spacing={4}>
            <InitialValueInput isLoading={isLoading} />
            <GoalInput isLoading={isLoading} />
          </Stack>

          <OwnerInput isLoading={isLoading} />

          <FormActions
            isEditingKeyResult={Boolean(editingModeKeyResult)}
            isLoading={isLoading}
            onClose={onClose}
          />
        </FormControl>
      </Form>
    </Formik>
  )
}
