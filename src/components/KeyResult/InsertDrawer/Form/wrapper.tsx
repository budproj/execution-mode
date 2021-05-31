import { FormControl } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import React from 'react'

import { DescriptionInput } from './description'
import { FormatInput } from './format'
import { TitleInput } from './title'

type FormValues = {
  title: string
  description: string
}

export const KeyResultInsertDrawerFormWrapper = () => {
  const initialValues: FormValues = {
    title: '',
    description: '',
  }

  const handleSubmit = (values: FormValues): void => {}

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
