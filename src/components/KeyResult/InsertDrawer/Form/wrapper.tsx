import { Stack } from '@chakra-ui/layout'
import { FormControl } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import React from 'react'
import { useRecoilValue } from 'recoil'

import meAtom from '../../../../state/recoil/user/me'
import { KEY_RESULT_FORMAT } from '../../constants'

import { FormActions } from './actions'
import { DescriptionInput } from './description'
import { FormatInput } from './format'
import { GoalInput } from './goal'
import { InitialValueInput } from './initial-value'
import { OwnerInput } from './owner'
import { TitleInput } from './title'

export type FormValues = {
  objectiveID?: string
  teamID?: string
  title: string
  description: string
  format: KEY_RESULT_FORMAT
  initialValue: number
  goal: number
  ownerId: string
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
  const initialValues: FormValues = {
    objectiveID,
    teamID,
    title: '',
    description: '',
    format: KEY_RESULT_FORMAT.PERCENTAGE,
    initialValue: 0,
    goal: 100,
    ownerId: currentUserID,
  }

  const handleSubmit = (values: FormValues): void => {
    console.log(values, 'tag')
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
