import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Stack } from '@chakra-ui/layout'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import { USER_GENDER } from '../../constants'

import messages from './messages'

type UserTeam = {
  id: string
  name: string
}

export type CreateUserFormValues = {
  firstName: string
  lastName: string
  email: string
  role: string
  gender?: USER_GENDER
  team: UserTeam[]
}

type CreateUserFormProperties = {
  initialValues?: CreateUserFormValues
  onSubmit: (
    values: CreateUserFormValues,
    actions: FormikHelpers<CreateUserFormValues>,
  ) => Promise<void>
}

const defaultInitialValues: CreateUserFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  gender: undefined,
  team: [],
}

export const CreateUserForm = ({ initialValues, onSubmit }: CreateUserFormProperties) => {
  initialValues ??= defaultInitialValues

  const intl = useIntl()

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <FormControl>
          <Stack>
            <CreateUserTextField
              id="firstName"
              label={intl.formatMessage(messages.firstNameLabel)}
            />
          </Stack>
        </FormControl>
      </Form>
    </Formik>
  )
}

type CreateUserTextField = {
  id: string
  label: string
}

const CreateUserTextField = ({ id, label }: CreateUserTextField) => (
  <Stack spacing={0}>
    <FormLabel>{label}</FormLabel>
    <Field name={id} component={Input} />
  </Stack>
)
