import { useMutation } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import { FormControl } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import { useRecoilValue } from 'recoil'

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
  objectiveID?: string
  teamID?: string
}

export const InsertKeyResultForm = ({
  onClose,
  objectiveID,
  teamID,
}: InsertKeyResultFormProperties) => {
  const currentUserID = useRecoilValue(meAtom)
  const [createKeyResult, { data, error, loading }] = useMutation<KeyResult>(
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

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const keyResultType =
      values.initialValue <= values.goal ? KEY_RESULT_TYPE.ASCENDING : KEY_RESULT_TYPE.DESCENDING
    const variables = {
      ...values,
      type: keyResultType,
    }

    await createKeyResult({ variables })
  }

  console.log(data, error, loading, 'tag')

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
          <TitleInput />
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
