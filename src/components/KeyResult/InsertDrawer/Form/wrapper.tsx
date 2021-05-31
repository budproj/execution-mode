import { Stack } from '@chakra-ui/layout'
import { FormControl } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import React from 'react'

import { KEY_RESULT_FORMAT } from '../../constants'

import { DescriptionInput } from './description'
import { FormatInput } from './format'
import { GoalInput } from './goal'
import { InitialValueInput } from './initial-value'
import { TitleInput } from './title'

export type FormValues = {
  title: string
  description: string
  format: KEY_RESULT_FORMAT
  initialValue: number
  goal: number
}

export const KeyResultInsertDrawerFormWrapper = () => {
  const initialValues: FormValues = {
    title: '',
    description: '',
    format: KEY_RESULT_FORMAT.PERCENTAGE,
    initialValue: 0,
    goal: 100,
  }

  const handleSubmit = (values: FormValues): void => {
    console.log(values)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <FormControl id="key-result-insert" display="flex" flexDirection="column" p={8} gridGap={8}>
          <TitleInput />
          <DescriptionInput />
          <FormatInput />

          <Stack direction="row" spacing={4}>
            <InitialValueInput />
            <GoalInput />
          </Stack>
        </FormControl>
      </Form>
    </Formik>
  )
}
