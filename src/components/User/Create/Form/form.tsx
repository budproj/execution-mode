import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { HStack, Stack } from '@chakra-ui/layout'
import { Field, Form, Formik, FormikHelpers, useFormikContext } from 'formik'
import React, { ChangeEvent } from 'react'
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
      {({ values }) => (
        <Form style={{ height: '100%' }}>
          <FormControl h="full">
            <Stack spacing={8} h="full">
              <CreateUserTextField
                id="firstName"
                label={intl.formatMessage(messages.firstNameLabel)}
              />
              <CreateUserTextField
                id="lastName"
                label={intl.formatMessage(messages.lastNameLabel)}
              />
              <CreateUserTextField id="email" label={intl.formatMessage(messages.emailLabel)} />
              <CreateUserTextField id="role" label={intl.formatMessage(messages.roleLabel)} />

              <HStack flexGrow={1} alignItems="flex-end">
                <Button variant="solid" colorScheme="brand" type="submit">
                  {intl.formatMessage(messages.submitButtonLabel, { gender: values.gender })}
                </Button>
              </HStack>
            </Stack>
          </FormControl>
        </Form>
      )}
    </Formik>
  )
}

type CreateUserTextField = {
  id: string
  label: string
}

const CreateUserTextField = ({ id, label }: CreateUserTextField) => {
  const { setFieldValue } = useFormikContext<CreateUserFormValues>()

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(id, event.target.value)
  }

  return (
    <Stack spacing={0}>
      <FormLabel>{label}</FormLabel>
      <Field name={id} component={Input} onBlur={handleBlur} />
    </Stack>
  )
}
