import { FormControl } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import React from 'react'

import { KEY_RESULT_FORMAT } from '../../constants'

import { DescriptionInput } from './description'
import { FormatInput } from './format'
import { TitleInput } from './title'

export type FormValues = {
  title: string
  description: string
  format: KEY_RESULT_FORMAT
}

export const KeyResultInsertDrawerFormWrapper = () => {
  const initialValues: FormValues = {
    title: '',
    description: '',
    format: KEY_RESULT_FORMAT.PERCENTAGE,
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
        </FormControl>
      </Form>
    </Formik>
  )
}
