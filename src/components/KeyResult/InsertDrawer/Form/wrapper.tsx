import { useMutation } from '@apollo/client'
import { Stack, FormControl, VStack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { ObjectiveMode } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import { objectiveAtomFamily } from 'src/state/recoil/objective'

import { lastInsertedKeyResultIDAtom } from '../../../../state/recoil/key-result/drawers/insert/last-inserted-key-result-id-atom'
import meAtom from '../../../../state/recoil/user/me'
import { KEY_RESULT_FORMAT, KEY_RESULT_MODE, KEY_RESULT_TYPE } from '../../constants'
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
  teamID?: Team['id'] | null
  title: string
  description: string
  format: KEY_RESULT_FORMAT
  initialValue: number
  goal: number
  type?: KEY_RESULT_TYPE
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
  editingKeyResultId?: string
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

function getUpdatePatches<T extends Record<string, unknown>>(
  oldKeyResultState: T,
  newKeyResultState: T,
): Partial<T> {
  const differingAttributes: Partial<T> = {}

  const keys: Array<keyof T> = Object.keys(oldKeyResultState) as Array<keyof T>

  for (const key of keys) {
    if (oldKeyResultState[key] !== newKeyResultState[key]) {
      differingAttributes[key] = newKeyResultState[key]
    }
  }

  return differingAttributes
}

const timelineSelector = buildPartialSelector<KeyResult['timeline']>('timeline')

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
  editingKeyResultId,
}: InsertKeyResultFormProperties) => {
  const [validationErrors, setValidationErrors] = useState<Array<keyof FormValues>>([])

  const setTimeline = useSetRecoilState(timelineSelector(editingKeyResultId))

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
    type: KEY_RESULT_TYPE.ASCENDING,
    goal: 100,
    ownerID,
  }))

  const setLastInsertedKeyResultID = useSetRecoilState(lastInsertedKeyResultIDAtom)
  const objective = useRecoilValue(objectiveAtomFamily(objectiveID))
  const [createKeyResult, { data, error }] = useMutation<CreateKeyResultMutationResult>(
    queries.CREATE_KEY_RESULT,
  )

  const [updateKeyResult] = useMutation<UpdateKeyResultMutationResult>(queries.UPDATE_KEY_RESULT)

  const keyResult = editingKeyResultId ? editingModeKeyResult : undefined

  useEffect(() => {
    if (keyResult)
      setInitialValues({
        objectiveID: keyResult.objective.id,
        teamID: keyResult.teamId,
        title: keyResult.title,
        description: keyResult.description ?? '',
        format: keyResult.format,
        initialValue: keyResult.initialValue,
        type: keyResult.type,
        goal: keyResult.goal,
        ownerID: keyResult.owner.id,
      })
  }, [keyResult])

  const validateFields = useCallback(
    (values: FormValues) => {
      const invalidFields: Array<keyof FormValues> = []

      if (!values.title || values.title === '') invalidFields.push('title')

      if (invalidFields !== validationErrors) setValidationErrors(invalidFields)

      return invalidFields.length === 0
    },

    [validationErrors],
  )

  const keyResultMode =
    objective?.mode === ObjectiveMode.DRAFT ? KEY_RESULT_MODE.DRAFT : KEY_RESULT_MODE.PUBLISHED

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      const areAllFieldsValid = validateFields(values)

      if (!areAllFieldsValid) {
        if (onValidationError) onValidationError()

        return
      }

      if (values.initialValue <= values.goal) {
        values.type = KEY_RESULT_TYPE.ASCENDING
      } else {
        values.type = KEY_RESULT_TYPE.DESCENDING
      }

      const variables = {
        ...values,

        mode: keyResultMode,

        type: defineKeyResultType(values),
      }

      const differingAttributes = getUpdatePatches(initialValues, variables)

      await (editingModeKeyResult && keyResult
        ? updateKeyResult({
            variables: { id: keyResult.id, ...differingAttributes },

            onCompleted: () => {
              // eslint-disable-next-line unicorn/no-useless-undefined
              setTimeline(undefined)
              if (onSuccess) onSuccess(currentUserID)
            },
          }).catch(() => {
            if (onError) onError()
          })
        : createKeyResult({
            variables: { ...variables },

            onCompleted: (data) => {
              if (onSuccess) onSuccess(currentUserID)
              setLastInsertedKeyResultID(data.createKeyResult.id)
            },
          }).catch(() => {
            if (onError) onError()
          }))
    },

    [
      createKeyResult,
      currentUserID,
      editingModeKeyResult,
      initialValues,
      keyResult,
      keyResultMode,
      onError,
      onSuccess,
      onValidationError,
      setLastInsertedKeyResultID,
      setTimeline,
      updateKeyResult,
      validateFields,
    ],
  )

  useEffect(() => {
    if (data && !error && data) setLastInsertedKeyResultID(data.createKeyResult.id)
  }, [data, error, setLastInsertedKeyResultID])

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
          {/* {!isLoading && !editingModeKeyResult && <OkrExampleLink />} */}
          <FormatInput isLoading={isLoading} />

          <Stack direction="row" spacing={4}>
            <InitialValueInput isLoading={isLoading} />
            <GoalInput isLoading={isLoading} />
          </Stack>

          <OwnerInput isLoading={isLoading} />

          <FormActions
            isEditingKeyResult={Boolean(editingModeKeyResult)}
            isLoading={isLoading}
            editingKeyResultId={editingKeyResultId}
            keyResultMode={keyResultMode}
            onClose={onClose}
          />
        </FormControl>
      </Form>
    </Formik>
  )
}
